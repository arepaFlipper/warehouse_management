with import <nixpkgs> {};
stdenv.mkDerivation {
  name = "abc-dev-environment";
  buildInputs = [ pkg-config zlib openssl nodejs ];
}
