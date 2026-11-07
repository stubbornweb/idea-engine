# Pains index format

`~/www/clients-meta/PAINS-INDEX.md`. One row per pain, shared across every client who has it. Under the table, each pain with 3 or more clients has a signals section.

```markdown
# Pains index

| Pain | Clients |
|---|---|
| members book classes by phone | [fitwerk](fitwerk/INTAKE.md), [yoga-loft](yoga-loft/INTAKE.md) |
| invoices retyped from email into accounting | [a](a/INTAKE.md), [b](b/INTAKE.md), [c](c/INTAKE.md) |

## Signals: invoices retyped from email into accounting

### YYYY-MM-DD: <client-slug>

- **Source:** <link>
- **Industry:** <industry>
- **Who:** <role: front desk manager, gym owner>
- **Pain:** <paraphrased; quote only when the wording matters>
- **Level:** <1–4> <attention | complaint | workaround | money>
- **Money:** <any amount mentioned, or none>
```

## Normalizing

The same pain must land on the same row, whoever reported it.

- Name the **struggling moment**: who does what, the hard way. Under ten words.
- Role and action only. Add the industry when the pain exists only there.
- Before adding a row, read every existing row. Same struggling moment, same row, whatever the wording.

## Counting

Count distinct clients on a row. **3 clients** makes the pain a product candidate: add its signals section, with one entry per client. The section title uses the pain as the row names it. Append-only.

## Signal ladder

| Level | Signal | Example |
|---|---|---|
| 1 | **Attention** | likes, views, "same here" |
| 2 | **Complaint** | describes the pain in their own words |
| 3 | **Workaround** | built a spreadsheet, a script, a manual routine |
| 4 | **Money** | paid, posted a paid job, or named a budget |

A paid job post from a client is level 4.
