{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20,
    libglib2.0-0
  ];
  idx.extensions = [
    
  ];
  idx.previews = {
    previews = [
      {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        id = "web";
        manager = "web";
      }
      {
        id = "ios";
        manager = "ios";
      }
    ];
  };
}