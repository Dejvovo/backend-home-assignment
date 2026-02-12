1) Problem with prosgres:latest
Error: in 18+, these Docker images are configured to store database data in a
2026-02-12 10:03:36        format which is compatible with "pg_ctlcluster" (specifically, using
2026-02-12 10:03:36        major-version-specific directory names).  This better reflects how
2026-02-12 10:03:36        PostgreSQL itself works, and how upgrades are to be performed.
2026-02-12 10:03:36 
2026-02-12 10:03:36        See also https://github.com/docker-library/postgres/pull/1259
2026-02-12 10:03:36 
2026-02-12 10:03:36        Counter to that, there appears to be PostgreSQL data in:
2026-02-12 10:03:36          /var/lib/postgresql/data (unused mount/volume)
2026-02-12 10:03:36 
2026-02-12 10:03:36        This is usually the result of upgrading the Docker image without
2026-02-12 10:03:36        upgrading the underlying database using "pg_upgrade" (which requires both
2026-02-12 10:03:36        versions).
2026-02-12 10:03:36 
2026-02-12 10:03:36        The suggested container configuration for 18+ is to place a single mount
2026-02-12 10:03:36        at /var/lib/postgresql which will then place PostgreSQL data in a
2026-02-12 10:03:36        subdirectory, allowing usage of "pg_upgrade --link" without mount point
2026-02-12 10:03:36        boundary issues.
2026-02-12 10:03:36 
2026-02-12 10:03:36        See https://github.com/docker-library/postgres/issues/37 for a (long)
2026-02-12 10:03:36        discussion around this process, and suggestions for how to do so.

Resolved by switching docker image to:  postgres:14.4-alpine3.16