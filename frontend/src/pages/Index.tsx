
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      {/* Mars Background Element - Large with fading effect */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-transparent via-orange-500/10 to-transparent">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1200&h=1200&fit=crop&crop=center')",
            maskImage: "radial-gradient(circle at 80% 50%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 80% 50%, black 30%, transparent 70%)"
          }}
        ></div>
      </div>
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  THE BEST WAYS TO
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Explore the{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Red Planet
                </span>{' '}
                Like Never Before
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Start your space exploration journey today with cutting-edge Mars rover imagery 
                and comprehensive Earth weather monitoring from mission control.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/mars-gallery">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                    Explore Mars Gallery
                  </Button>
                </Link>
                
                <Link to="/weather">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Weather Monitor
                  </Button>
                </Link>
              </div>
              
              
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mission Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced space exploration tools designed for the modern astronaut and space enthusiast
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/30 backdrop-blur-sm border-border/30 hover:bg-card/50 transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-bold">Earth Weather Monitoring</h3>
                <p className="text-muted-foreground">
                  Real-time weather data from Earth to help plan your space missions and maintain communication with ground control.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-sm border-border/30 hover:bg-card/50 transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold">Mars Rover Gallery</h3>
                <p className="text-muted-foreground">
                  High-resolution images captured by Mars rovers, providing unprecedented views of the Red Planet's surface.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-sm border-border/30 hover:bg-card/50 transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🛰️</span>
                </div>
                <h3 className="text-xl font-bold">Mars Surface Exploration</h3>
                <p className="text-muted-foreground">
                  Advanced communication systems to fetch images across the vast distances of space exploration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
