import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink, 
  Copy, 
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Gift
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DashboardNavbar } from "@/components/DashboardNavbar";

export default function WalletPage() {
  const [walletConnected, setWalletConnected] = useState(true);
  const [claimable, setClaimable] = useState(247);
  const { toast } = useToast();

  const walletAddress = "0x742d35Cc6123456789ABCDEFabcdef1234567890";
  const balance = 1247;
  const usdValue = 2494;

  const transactions = [
    {
      id: "1",
      type: "earned",
      amount: "+45 DST",
      description: "File access payment",
      timestamp: "2 hours ago",
      hash: "0xabc123..."
    },
    {
      id: "2", 
      type: "claimed",
      amount: "+120 DST",
      description: "Rewards claimed",
      timestamp: "1 day ago",
      hash: "0xdef456..."
    },
    {
      id: "3",
      type: "spent",
      amount: "-10 DST",
      description: "File access purchase",
      timestamp: "3 days ago",
      hash: "0xghi789..."
    },
    {
      id: "4",
      type: "earned",
      amount: "+28 DST",
      description: "File access payment",
      timestamp: "1 week ago",
      hash: "0xjkl012..."
    }
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const claimRewards = () => {
    setClaimable(0);
    toast({
      title: "Rewards claimed!",
      description: `Successfully claimed ${claimable} DST tokens`,
    });
  };

  const connectWallet = () => {
    setWalletConnected(true);
    toast({
      title: "Wallet connected",
      description: "Successfully connected to MetaMask",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earned":
        return <ArrowDownLeft className="h-4 w-4 text-success" />;
      case "spent":
        return <ArrowUpRight className="h-4 w-4 text-destructive" />;
      case "claimed":
        return <Gift className="h-4 w-4 text-warning" />;
      default:
        return <Coins className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Wallet & Tokens</h1>
            <p className="text-muted-foreground">
              Manage your DST tokens and view transaction history.
            </p>
          </div>

          {!walletConnected ? (
            <Card className="mb-8">
              <CardContent className="text-center py-12">
                <Wallet className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
                <p className="text-muted-foreground mb-6">
                  Connect your wallet to view your DST balance and transaction history.
                </p>
                <Button variant="hero" onClick={connectWallet}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Wallet Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Balance Card */}
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-5 w-5" />
                        <span>DST Balance</span>
                      </div>
                      <Badge variant="secondary">Connected</Badge>
                    </CardTitle>
                    <CardDescription>Your DecentralStorage Token balance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-4xl font-bold">{balance.toLocaleString()}</span>
                          <span className="text-lg text-muted-foreground">DST</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ≈ ${usdValue.toLocaleString()} USD
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg">
                        <span className="font-mono text-sm">{walletAddress}</span>
                        <Button variant="ghost" size="sm" onClick={copyAddress}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>

                      {claimable > 0 && (
                        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-success">Rewards Available</p>
                              <p className="text-sm text-muted-foreground">
                                {claimable} DST tokens ready to claim
                              </p>
                            </div>
                            <Button variant="hero" onClick={claimRewards}>
                              <Gift className="h-4 w-4 mr-2" />
                              Claim
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Your recent DST token transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-3">
                            {getTransactionIcon(tx.type)}
                            <div>
                              <p className="font-medium">{tx.description}</p>
                              <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${
                              tx.type === 'spent' ? 'text-destructive' : 'text-success'
                            }`}>
                              {tx.amount}
                            </p>
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Token Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">24h Change</span>
                      <div className="flex items-center space-x-1 text-success">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">+5.7%</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Earned</span>
                      <span className="font-medium">2,891 DST</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Spent</span>
                      <span className="font-medium">196 DST</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-medium text-success">+421 DST</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Earning Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Goal</CardTitle>
                    <CardDescription>Earning progress this month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>421 / 500 DST</span>
                        <span>84%</span>
                      </div>
                      <Progress value={84} className="mt-2" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      79 DST more to reach your monthly goal
                    </p>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Buy DST
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Send Tokens
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Explorer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}