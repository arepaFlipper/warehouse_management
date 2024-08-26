{
  description = "This Nix flake creates a development shell for the Customer API that provides the
  required versions of dependencies such as NodeJS 18 and Prisma 4";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    nixpkgs-prisma-4.url = "github:NixOS/nixpkgs/29bcead8405cfe4c00085843eb372cc43837bb9d";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, nixpkgs-prisma-4, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      pkgs-prisma-4 = nixpkgs-prisma-4.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = [
          pkgs.nodejs_18
          pkgs-prisma-4.nodePackages.prisma
          pkgs-prisma-4.prisma-engines
        ];
        shellHook = with pkgs-prisma-4; ''
          export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
          export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
          export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
          export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
          export PATH="$PWD/node_modules/.bin:$PATH"
        '';
      };
    });
}
