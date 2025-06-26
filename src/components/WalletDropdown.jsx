import { useAccount, useDisconnect, useChainId, useChains } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const WalletDropdown = () => {
  // ✅ All hooks at the top (outside conditions)
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const chainId = useChainId();
  const chains = useChains();
  const currentChain = chains.find((chain) => chain.id === chainId);

  return (
    <div className="absolute top-16 left-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white p-4 w-72 shadow-lg z-50">
      {isConnected ? (
        <div>
          <p className="text-sm mb-2">
            👛 <strong>Address:</strong>
            <br />
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <p className="text-sm mb-4">
            🔗 <strong>Chain:</strong> {currentChain?.name ?? "Unknown"}
          </p>
          <button
            onClick={disconnect}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-center">Wallet not connected.</p>
          <button
            onClick={openConnectModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletDropdown;
