import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Shield, Database, Coins, Users, Lock, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function Landing() {
  const features = [
    {
      icon: Shield,
      title: "Client-Side Encryption",
      description: "Your files are encrypted on your device before upload, ensuring complete privacy."
    },
    {
      icon: Database,
      title: "IPFS Storage",
      description: "Distributed storage across the IPFS network for maximum availability and censorship resistance."
    },
    {
      icon: Coins,
      title: "Token Rewards",
      description: "Earn DST tokens by hosting storage and contributing to the network."
    },
    {
      icon: Users,
      title: "Decentralized Network",
      description: "No single point of failure with our distributed architecture."
    },
    {
      icon: Lock,
      title: "Access Control",
      description: "Token-based access management for secure file sharing."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with intelligent caching and CDN integration."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Decentralized
              <br />
              Cloud Storage
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Secure, private, and censorship-resistant file storage powered by IPFS and blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild className="text-lg px-8 py-4 h-14">
                <Link to="/auth">Start Storing Securely</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-14">
                <Link to="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EtherVault?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of cloud storage with our cutting-edge decentralized platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Take Control?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already made the switch to decentralized storage.
            </p>
            <Button variant="hero" size="lg" asChild className="text-lg px-8 py-4 h-14">
              <Link to="/auth">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/20 border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EtherVault</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Secure • Decentralized • Private
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/help" className="hover:text-foreground transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}