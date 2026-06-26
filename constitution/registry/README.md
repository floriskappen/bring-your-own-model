# BYOM app registry

The registry is the list of apps that follow the BYOM pattern. It is designed to be worth maintaining
at **N=1** — the value is real even if the only listed apps are the builder's own. External adopters
are a bonus, never a design assumption.

This directory holds three things:

| File | Purpose |
| --- | --- |
| `registry.yaml` | The data. Adding an app is a data edit here; the website (Phase 4) renders from this file. |
| `registry.schema.json` | The machine-checked contract — a JSON Schema (Draft 2020-12) describing exactly what an entry must look like. |
| `validate_registry.py` | A validator that checks `registry.yaml` against the schema using PyYAML + jsonschema. Runs locally and in CI. |

The constitution defines the badge's meaning and claim boundary at
[`04-badge-and-registry.md`](../04-badge-and-registry.md). This directory
defines the concrete registry artifact.

## Field reference

### Registry-level

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `schema_version` | yes | string | Semver version of the **registry entry schema itself** (`vX.Y.Z`), so the format can evolve. Bumped when required fields or validation rules change. Independent of the constitution version. |
| `apps` | yes | array | The list of apps. May be empty before any app is published. |

### Per app

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `name` | yes | string | App display name. |
| `url` | yes | string | Live app URL. Must be `https://`. |
| `description` | yes | string | One-line, plain description. No hype. Max 160 chars. |
| `pinned_constitution_version` | yes | string | Released constitution tag the app is built against (`vX.Y.Z`) — the submodule pin. |
| `integration_doc_url` | yes | string | Link to the app's `BYOM-INTEGRATION.md` (rendered or raw). Per `05-integration-guide.md`, every BYOM app authors this doc at its repo root. Must be `https://`. |
| `source_url` | yes | string | Repo or source link. Must be `https://`. |
| `model_powered_features` | yes | array | The model-powered features. Non-empty: a BYOM app has at least one model-powered feature. |
| `badge_variant` | no | enum | Which badge variant the app displays: `light` \| `dark` \| `light-small` \| `dark-small`. Defaults to `light` (standard). |
| `notes` | no | string | Free-text notes (launch status, platform caveats). Keep brief. |

### Per feature (entries in `model_powered_features`)

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `name` | yes | string | Feature name as shown in the app. |
| `description` | yes | string | One-line description of what the feature does and why it needs a model. Max 240 chars. |
| `category` | yes | enum | `frontier` \| `worker`, per `01-provider-model.md`. Default to `worker` unless frontier is genuinely required. |

## Submission process

Submissions are **PR-based**. To add or update an app:

1. **Fork and branch.** Branch off `main`, e.g. `registry/add-my-app`.
2. **Edit the data.** Add your entry to [`registry.yaml`](./registry.yaml). Do not edit
   `registry.schema.json` — that is the contract, changed only by maintainers when the format
   itself evolves (and then `schema_version` is bumped).
3. **Validate locally.** From the repo root:

   ```sh
   pip install pyyaml jsonschema
   python3 constitution/registry/validate_registry.py
   ```

   The validator uses [PyYAML](https://pyyaml.org/) and
   [jsonschema](https://python-jsonschema.readthedocs.io/). It must exit `0`
   before you push. CI runs the same command on your PR and will block the
   merge on any violation.

4. **Open the PR.** Include the app's live URL and `BYOM-INTEGRATION.md` link in the PR body so a
   reviewer can spot-check. A maintainer reviews for: the app is free and open source, genuinely
   follows the pattern and the six security invariants, the `BYOM-INTEGRATION.md` exists and is
   honest, the pinned constitution version is a real released tag, and the entry matches the schema.

5. **Merge.** The site renders from the merged `registry.yaml`.

### Honest display

The badge does not guarantee safety (see `04-badge-and-registry.md`), and neither does a registry
entry. Listing an app says it *follows the pattern and the invariants* and that a `BYOM-INTEGRATION.md`
exists — it is not a security audit. The website's registry page renders entries with that framing;
submitters should not claim more in their `description` or `notes` than the pattern warrants.

## Validator

`validate_registry.py` loads the schema and the YAML, then runs the
Draft 2020-12 validator with format checking enabled (`https://` URLs, semver
patterns, enum values, required fields, `additionalProperties: false`, length
limits, `minItems`). Add new validation rules by editing `registry.schema.json`
— the validator picks them up automatically; no validator code changes needed.
