# Important packages
npm install -g protoc-gen-ts

# Important Scripts
1. Script to build .proto files to ts
```
protoc -I=sourcedir --ts_out=dist myproto.proto
```

2. Script to build .proto files to js
```
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=grpc_js:./ user.proto
```