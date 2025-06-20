{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShell.${system} = pkgs.mkShell {
        packages = with pkgs; [
	  nodejs_24
	  bun
	  typescript-language-server
	  tailwindcss-language-server
	  # eslint_d
	  # prettierd
	  biome
	  wrangler
        ];
        shellHook = ''
          exec zsh
        '';
      };
    };
}
