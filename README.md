# Encouragement Dapp

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

## Advanced

For the hackathon: try the following at the REPL:

TODO: /ibc-hop/$MYCONNNAME/ibc-port/$THEIRPORT

```js
c = home.ibcport[1]~.connect('/ibc-port/portbvmnfb', 
          { onReceive(c, bytes) { console.log("Encourager says: ", bytes); } });
c~.send('hello!');
c~.close();
```

How to run two solo vats for the same chain:

```sh
cd ~/agoric-sdk/packages/cosmic-swingset
make NUM_SOLOS=2 scenario2-setup scenario2-run-chain
make scenario2-run-client BASE_PORT=8000
make scenario2-run-client BASE_PORT=8001
```

How to run using the relayer!

```
./scripts/nchainz init ibc0=agoric ibc1=agoric ibc0:ibc1
```
Answer 'yes' to overrite, 'no' to run the relayer

```sh
./scripts/nchainz run
```

Deploy your contract. It will go to the ag-solo at port 8000.

In the REPL for http://localhost:8001:
```js
c = E(home.ibcport[2]).connect('/ibc-hop/ibczerolink/ibc-port/portbvmnfb/ordered/demo1', 
     { onReceive(c, bytes) { console.log("Encourager says: ", bytes); },
       infoMessage(...msg) { console.log("IBC Connection Info: ", ...msg); } })
```

Copy the config to `~/.relayer/config/config.yaml`, especailly note the port names.

```sh
./scripts/nchainz relay
```

