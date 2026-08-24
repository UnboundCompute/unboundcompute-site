# UnboundCompute story and language

## One sentence

UnboundCompute is an autonomous security researcher that learns how an application is meant to behave, tests the boundaries it trusts inside an authorized environment, and returns proof engineers can replay.

## The narrative order

1. **The problem:** application failures are usually logic failures at boundaries: identity, ownership, workflow, state, role, or service trust.
2. **The product:** Lachesis reads source and observes the running application so it can reason about the application’s own rules.
3. **The method:** the team supplies the environment, scope, and test identities; Lachesis forms questions, tests controls, and follows evidence.
4. **The result:** a finding clearly separates observed, proven, blocked, and untested. A proven finding includes the request, response, source path, explanation, and replay.
5. **The next step:** teams in private access give Lachesis an authorized staging environment and a boundary worth testing.

## Terms to use consistently

- Say **security research** or **application security research**, not “AI pentest” as the primary product description.
- Say **authorized environment**, **scope**, and **test identities** when describing operation.
- Say **observed**, **proven**, **blocked**, and **untested** for evidence state.
- Say **boundary failure** when describing the underlying problem.
- Say **Lachesis** for the researcher and code understanding layer when the distinction matters.
- Say **evidence**, **source path**, **recorded request**, **control**, and **replay** for the output.

## Terms to avoid

- “Researching now” when a page is showing sample or illustrative data.
- “Likely exploitable” as a product claim.
- “Finds everything,” “continuous pentesting,” or other coverage promises the evidence cannot support.
- Fictional customer names or product labels in product UI.
- Mixing “Unbound Compute” and “UnboundCompute.” The product name is **UnboundCompute**.

## Page jobs

- **Homepage:** establish the problem, show the product evidence loop, explain who it is for, and invite authorized private access.
- **Lachesis:** explain the open code property graph that makes source-aware research possible.
- **Open source:** show how the open components fit together and give developers a useful next step.
- **Research:** explain the research method and evidence discipline.
- **Design partners:** make the private-access request concrete, scoped, and low-friction.
- **Tools:** offer practical client-side utilities as an independent, no-signup entry point.
- **About, trust, privacy, terms:** provide confidence and operational clarity without making product claims they cannot substantiate.
