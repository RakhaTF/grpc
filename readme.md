# Important packages
npm install -g protoc-gen-ts

# Important Scripts
1. Script to build .proto files to ts
```
protoc -I=sourcedir --ts_out=dist myproto.proto
```
OR
```
grpc_tools_node_protoc --ts_out=grpc_js:./src/protos/test --grpc_out=grpc_js:./src/protos/test --proto_path=./src/protos/ user.proto
```

2. Script to build .proto files to js
```
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=grpc_js:./ user.proto
```

# Note on creating .proto
``` Assign a field number:

This is the serialization sequence in number format. Field numbers cannot be repurposed or reused. If you delete a field, you should reserve its field number to prevent someone from accidentally reusing the number.

syntax = "proto3";

message Login {
    string userName = 1; 
    [type] [name]     [number]
    string password = 2;
}

message Logins {
    repeated Login logins = 1;
}
```
# Generate proto using buf

1. cd to src/definition

2. run ``` npx buf generate ``` in cmd