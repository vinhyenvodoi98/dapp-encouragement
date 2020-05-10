# Encouragement Dapp (dIBC version)

The Encouragement Dapp is the simplest [Agoric
Dapp](https://agoric.com/documentation/dapps/). It
demonstrates the three important parts of
a dapp and how they should be connected:
1. the browser UI (the frontend)
2. the API server (the backend)
3. the on-chain contract

This dapp starts a local
blockchain on your computer, and deploys a basic contract to that
blockchain. It does not currently deploy or connect to the Agoric testnet.

This particular dapp UI is written in vanilla JS for simplicity (as
opposed to using a framework).

## Functionality

The Encouragement Dapp:

1. Subscribes to contract notifications via the API server
2. Accesses your Agoric wallet, and
3. At the user's request, either:

    1. requests some free encouragement, or
    2. proposes (via the user's wallet and Zoe) exchanging a Tip for
       some Encouragement (the tip is not yet sent to the Zoe
       contract, but you will still get some encouragement.)

To learn more about how to build Agoric Dapps, please see the [Dapp Guide](https://agoric.com/documentation/dapps/).

Here's the interface:

![Screenshot Before Encouragement](readme-assets/before.png)

and after we click the "Encourage Me!" button:

![Screenshot After Encouragement](readme-assets/after.png)

## TODO

Things we need to fix are listed in [the Github issues for this repository](https://github.com/Agoric/dapp-encouragement/issues).

## IBC Demo

### One Chain

Deploy your contract as described in the Dapps guide (https://agoric.com/documentation/dapps/). It will be installed on the Agoric VM at port 8000, then try the following at the REPL:

```js
c = E(home.ibcport[1]).connect('/ibc-port/portbvmnfb', 
          { onReceive(c, bytes) { console.log("Encourager says: ", bytes); } });
E(c).send('hello!');
E(c).close();
```

How to run two VMs for the same chain:

```sh
cd ~/agoric-sdk/packages/cosmic-swingset
make NUM_SOLOS=2 scenario2-setup scenario2-run-chain
make scenario2-run-client BASE_PORT=8000
make scenario2-run-client BASE_PORT=8001
```

You should be able to deploy the contract to port 8000, and communicate with it on http://localhost:8001

### Relayer

This is a demo of communication between two independent chains.

You first should follow the above "One Chain" instructions to familiarise yourself with the demo and ensure you have all the prerequisites.

Next, check out the relayer branch:

```sh
git clone git://github.com/iqlusioninc/relayer
cd relayer
git checkout jack/debuggin
```

Configure two Agoric chains with a link between them:

```
./scripts/nchainz init ibc0=agoric ibc1=agoric ibc0:ibc1
```

Answer 'yes' to overwrite, 'no' to run the relayer (you'll do that
manually below).  Then start the chains:

```sh
./scripts/nchainz run
```

Deploy your contract as described in the Dapps guide (https://agoric.com/documentation/dapps/). It will be installed on the Agoric VM at port 8000 (the first chain).

In the REPL for http://localhost:8001 (the second chain):
```js
c = E(home.ibcport[2]).connect('/ibc-hop/ibczerolink/ibc-port/portbvmnfb/ordered/demo1', 
     { onReceive(c, bytes) { console.log("Encourager says: ", bytes); },
       infoMessage(...msg) { console.log("IBC Connection Info: ", ...msg); } })
```

Follow the instructions printed to execute the correct `ag-nchainz` command.  You should see the channel being established.

Return to the REPL, and you can send messages to the new channel as you did with the single-chain demo.
