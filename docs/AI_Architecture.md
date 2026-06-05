# AI Integration & Failover Architecture

HeritageVerse features a resilient, multi-provider AI engine that compiles detailed profiles and multi-day itineraries on-demand.

---

## 1. Failover Chain Architecture
To ensure high availability and prevent failures due to API rate limits or quota issues, the platform implements a sequential failover cascade:

```mermaid
graph TD
    Start[Request Place / Itinerary] --> Gemini{1. Gemini Direct}
    Gemini -->|Success| Return[Return JSON Payload]
    Gemini -->|Fail / Timeout| Lovable{2. Lovable Gateway}
    Lovable -->|Success| Return
    Lovable -->|Fail / Timeout| Groq{3. Groq API}
    Groq -->|Success| Return
    Groq -->|Fail / Timeout| OpenRouter{4. OpenRouter}
    OpenRouter -->|Success| Return
    OpenRouter -->|Fail / Timeout| Static[5. Static Local Fallback]
    Static --> Return
```

### 1.1 Failover Sequence

1. **Gemini Direct (`gemini-1.5-flash`):** The primary engine, queried directly via the Google Generative Language API. This is cost-efficient and supports native JSON responses.
2. **Lovable AI Gateway (`gemini-3-flash-preview`):** The first fallback, queried via an intermediate API gateway.
3. **Groq API (`llama-3.3-70b-versatile`):** The second fallback, using Groq's high-speed inference engine.
4. **OpenRouter API (`gemini-2.5-flash`):** The third fallback, routed through OpenRouter's aggregation gateway.
5. **Static Fallback Generator:** The final fallback. If all API requests fail, a local database function is called to return high-fidelity mock data (e.g. for Hyderabad/Birla Mandir, or generic templates for other destinations), preventing application crashes.

---

## 2. Sequence Diagram

The following diagram shows the sequential failover process:

```mermaid
sequenceDiagram
    participant Server as Nitro Server Function
    participant Gemini as Gemini API
    participant Lovable as Lovable Gateway
    participant Groq as Groq API
    participant OpenRouter as OpenRouter
    participant LocalDB as Local Mock DB

    Server->>Gemini: Fetch place description
    alt Gemini Success (200 OK)
        Gemini-->>Server: Return JSON
    else Gemini Fail (Error / Quota Exhausted)
        Note over Server: Failover to Lovable Gateway
        Server->>Lovable: Fetch description
        alt Lovable Success
            Lovable-->>Server: Return JSON
        else Lovable Fail
            Note over Server: Failover to Groq
            Server->>Groq: Fetch description (Llama model)
            alt Groq Success
                Groq-->>Server: Return JSON
            else Groq Fail
                Note over Server: Failover to OpenRouter
                Server->>OpenRouter: Fetch description
                alt OpenRouter Success
                    OpenRouter-->>Server: Return JSON
                else OpenRouter Fail
                    Note over Server: Fallback to local static mock data
                    Server->>LocalDB: Retrieve mock data
                    LocalDB-->>Server: Return fallback JSON
                end
            end
        end
    end
```

---

## 3. JSON Output Validation
All AI models are instructed to return raw, unformatted JSON that conforms to a strict schema. The output is validated on the client side using **Zod** to catch any formatting or structure changes before rendering:

```typescript
// Example validator snippet
const Input = z.object({
  name: z.string().min(1).max(160),
  country: z.string().max(120).optional(),
  admin: z.string().max(120).optional(),
});
```
This validation enforces structure consistency across all providers.
