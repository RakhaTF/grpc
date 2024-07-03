import { WalletClient } from './wallet';
import { WalletInfoRequest, WalletInfoResponse } from './wallet';
import * as grpc from '@grpc/grpc-js';

function main() {

    const client = new WalletClient('localhost:50051', grpc.credentials.createInsecure());
    const request = new WalletInfoRequest();
    request.address = '0x1234567890abcdef';
    client.walletInfo(request, (error, response) => {
        if (error) {
            console.error(error);
        } else {
            if (response) {
                console.log(response.total);
                console.log(response.available);
                console.log(response.transactions);
            }
        }
    });
}

main()