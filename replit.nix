
{ pkgs }: {
  deps = [
    pkgs.openssh
    pkgs.nodejs-18_x
    pkgs.nodePackages.npm
    pkgs.yarn
  ];
}
