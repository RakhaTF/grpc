import * as grpc from '@grpc/grpc-js';
import { BalanceRequest, BalanceResponse, CreateAddressRequest, CreateAddressResponse, Transaction, TransactionRequest, TransactionResponse, WalletClient, WalletInfoRequest, WalletInfoResponse } from "./wallet"

async function walletInfo(call: grpc.ServerUnaryCall<WalletInfoRequest, WalletInfoResponse>, callback: grpc.sendUnaryData<WalletInfoResponse>) {
    const address = call.request;
    try {
        const result = {
            total: 100,
            available: 80,
        };
        // Create proper Transaction instances
        const transactions: Transaction[] = [
            new Transaction({
                to_address: '0x1234567890',
                points: 10,
                metadata: "test" // Assuming metadata is correctly handled in the Transaction class
            }),
            new Transaction({
                to_address: '0x0987654321',
                points: 20,
                metadata: "test"
            })
        ];

        // Create WalletInfoResponse with proper transactions
        const response = new WalletInfoResponse({
            total: result.total,
            available: result.available,
            transactions
        });

        callback(null, response);
    } catch (err: any) {
        callback(err, null);
    }
}

function createAddress(call: grpc.ServerUnaryCall<CreateAddressRequest, CreateAddressResponse>, callback: grpc.sendUnaryData<CreateAddressResponse>) {
    // Perform necessary business logic
    const address = '0x1234567890abcdef';
    const createAddressResponse = new CreateAddressResponse();
    createAddressResponse.address = address;
    callback(null, createAddressResponse);
}

function transaction(call: grpc.ServerUnaryCall<TransactionRequest, TransactionResponse>, callback: grpc.sendUnaryData<TransactionResponse>) {
    // Perform necessary business logic
    const transactionId = Date.now();
    const transactionResponse = new TransactionResponse();
    transactionResponse.transaction_id = transactionId;
    callback(null, transactionResponse);
}

function balance(call: grpc.ServerUnaryCall<BalanceRequest, BalanceResponse>, callback: grpc.sendUnaryData<BalanceResponse>) {
    // Perform necessary business logic
    const total = 100;
    const available = 50;
    const balanceResponse = new BalanceResponse();
    balanceResponse.total = total;
    balanceResponse.available = available;
    callback(null, balanceResponse);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addService(WalletClient.service, { walletInfo, balance });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err != null) {
            return console.error(err);
        }
        console.log(`gRPC listening on ${port}`)
    });
}

main();