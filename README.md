# Rice Playground

![](./assets/banner.jpeg)

This hosts the playground server for [Rice](https://github.com/anhcraft/rice) - a minimal embeddable scripting language for Go applications.

## Local Development

```bash
go run ./cmd/server
```

The server starts on `http://localhost:3000` by default. Set the `PORT` environment variable to change it:

```bash
PORT=8080 go run ./cmd/server
```

## Deploy to Vercel

This project is configured for deployment via the [Vercel Go runtime](https://vercel.com/docs/functions/runtimes/go). The Go Framework Preset detects the [`cmd/server/main.go`](cmd/server/main.go) entrypoint and the root [`go.mod`](go.mod) file automatically.

### Prerequisites

- A [Vercel account](https://vercel.com/signup)
- The [Vercel CLI](https://vercel.com/docs/cli) installed (`npm i -g vercel`)

### Deploy with Vercel CLI

1. Login to Vercel:

   ```bash
   vercel login
   ```

2. Deploy (from the project root):

   ```bash
   vercel
   ```

3. To deploy to production:

   ```bash
   vercel --prod
   ```

### Deploy with Git Integration

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project on [vercel.com/new](https://vercel.com/new).
3. Vercel will automatically detect the Go framework preset — no additional configuration is needed.
4. Every push to the default branch triggers a production deployment; pull requests get preview deployments.

### Configuration

The [`vercel.json`](vercel.json) file sets the framework preset to `go`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "go"
}
```

Vercel reads the Go version from the `go` directive in [`go.mod`](go.mod). The server binary is built and executed on the Vercel Edge Network, listening on the `PORT` environment variable (set automatically by Vercel).
