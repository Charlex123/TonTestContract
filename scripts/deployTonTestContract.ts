import { toNano } from '@ton/core';
import { TonTestContract } from '../wrappers/TonTestContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonTestContract = provider.open(
        TonTestContract.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('TonTestContract')
        )
    );

    await tonTestContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tonTestContract.address);

    console.log('ID', await tonTestContract.getID());
}
