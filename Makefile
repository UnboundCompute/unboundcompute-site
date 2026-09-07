PYTHON ?= python3

.PHONY: check

check:
	$(PYTHON) scripts/verify-site-contract.py
