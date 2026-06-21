#!/usr/bin/env python3
"""Validate website/registry/registry.yaml against registry.schema.json.

Uses PyYAML and jsonschema (real libraries, not a hand-rolled parser). Run
from the repo root:

    python3 website/registry/validate_registry.py

Exits 0 if valid, non-zero with a per-field error report otherwise.
"""

import json
import os
import sys

import yaml
from jsonschema import Draft202012Validator, FormatChecker

REGISTRY_DIR = os.path.dirname(os.path.abspath(__file__))
SCHEMA_PATH = os.path.join(REGISTRY_DIR, "registry.schema.json")
DATA_PATH = os.path.join(REGISTRY_DIR, "registry.yaml")


def main() -> int:
    with open(SCHEMA_PATH, "r", encoding="utf-8") as fh:
        schema = json.load(fh)

    with open(DATA_PATH, "r", encoding="utf-8") as fh:
        data = yaml.safe_load(fh)

    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    errors = sorted(validator.iter_errors(data), key=lambda e: list(e.absolute_path))

    if not errors:
        apps = data.get("apps", []) if isinstance(data, dict) else []
        print(f"registry.yaml valid — {len(apps)} app(s).")
        return 0

    print("registry.yaml INVALID — errors:")
    for err in errors:
        loc = ".".join(str(p) for p in err.absolute_path) or "registry"
        print(f"  {loc}: {err.message}")
    print(f"\n{len(errors)} error(s).")
    return 1


if __name__ == "__main__":
    sys.exit(main())
