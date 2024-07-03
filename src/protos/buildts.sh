protoc \
--plugin=protoc-gen-ts=../../node_modules/.bin/protoc-gen-ts \
--ts_out=grpc_js:./ \
-I ./ \
./*.proto