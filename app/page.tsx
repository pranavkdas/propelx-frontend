"use client";

import { Button } from "@/components/ui/button";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Navbar from "@/components/Navbar";
import { SparklesCore } from "@/components/ui/sparkles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { CardStack } from "@/components/ui/card-stack";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Card } from "@/components/ui/card";
import { IconCircleNumber } from "@/components/ui/icon-circle-number";
import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { CardCarousel } from "@/components/ui/card-carousel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  Phone,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const words = [
    {
      text: "Your",
    },
    {
      text: "AI-Powered",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Marketing",
    },
    {
      text: "Copilot",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const cards = [
    {
      id: 1,
      title: "Data Analysis",
      description: "Analyze campaign performance in real-time",
      icon: "📊",
    },
    {
      id: 2,
      title: "Smart Insights",
      description: "Get AI-powered recommendations",
      icon: "💡",
    },
    {
      id: 3,
      title: "Ad Launch",
      description: "Deploy campaigns with one click",
      icon: "🚀",
    },
  ];

  const teamLogos = [
    {
      name: "IIT Bombay",
      logo: "/logos/iitb.png", // Add these images to your public folder
      role: "Technical Excellence"
    },
    {
      name: "IIM Kozhikode",
      logo: "/logos/iimk.png",
      role: "Business Strategy"
    },
    {
      name: "TATA",
      logo: "/logos/tata.png",
      role: "Industry Partner"
    }
  ];

  const howItWorksSteps = [
    {
      title: "Connect Platforms",
      description: "Seamlessly integrate your marketing platforms like Google Ads and Facebook Ads in just a few clicks.",
      icon: "🔌",
      delay: 0.1,
    },
    {
      title: "Chat with AI",
      description: "Ask questions, get insights, and receive recommendations through natural conversation.",
      icon: "🤖",
      delay: 0.2,
    },
    {
      title: "Visualize Results",
      description: "See your data come to life with instant visualizations and actionable insights.",
      icon: "📊",
      delay: 0.3,
    },
    {
      title: "Launch Campaigns",
      description: "Deploy optimized campaigns across platforms with a single command.",
      icon: "🚀",
      delay: 0.4,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      image: "/testimonials/sarah.jpg", // Add these images to your public folder
      quote: "The AI-powered insights have transformed our campaign performance. We've seen a 3x improvement in ROI since implementing this solution.",
    },
    {
      name: "Michael Chen",
      role: "Growth Lead",
      company: "StartupX",
      image: "/testimonials/michael.jpg",
      quote: "What used to take our team days now happens in minutes. The natural language interface makes complex marketing tasks accessible to everyone.",
    },
    {
      name: "Emma Davis",
      role: "Digital Marketing Manager",
      company: "E-commerce Pro",
      image: "/testimonials/emma.jpg",
      quote: "The automated insights and recommendations have become an indispensable part of our marketing strategy. It's like having an expert team member available 24/7.",
    },
  ];

  return (
    <>
      <Navbar />
      <TracingBeam className="px-6">
        <main className="flex min-h-screen flex-col items-center">
          {/* Hero Section */}
          <section id="hero" className="relative w-full min-h-screen flex items-center justify-center py-20">
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                id="tsparticles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#93c5fd"
              />
            </div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <TypewriterEffect words={words} className="!text-4xl md:!text-5xl lg:!text-6xl" />
                  <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                    Analyze data, gain insights, and launch ads—all from one chat window.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                    Request a Demo
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>

                <div className="flex items-center gap-4 justify-center text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          {/* <section id="features" className="w-full py-20">
            <HeroParallax products={products} />
          </section> */}

          {/* How It Works Section */}
          <section id="how-it-works" className="w-full py-20 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                id="howItWorksSparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={20}
                className="w-full h-full"
                particleColor="#93c5fd"
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  How It Works
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Get started with our AI marketing copilot in four simple steps
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {howItWorksSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: step.delay,
                      ease: "easeOut",
                    }}
                  >
                    <Card className="relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-6 flex gap-4">
                        <IconCircleNumber number={index + 1} />
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{step.icon}</span>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="w-full py-20 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                id="testimonialSparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={20}
                className="w-full h-full"
                particleColor="#93c5fd"
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  What Our Users Say
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Discover how our AI copilot is transforming marketing teams worldwide
                </p>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden">
                <CardCarousel>
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.name} testimonial={testimonial} />
                  ))}
                </CardCarousel>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="w-full py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
              <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
                <p className="text-lg mb-8 text-slate-700 dark:text-slate-300">
                  Get in touch with our team to discuss custom pricing plans tailored to your needs.
                </p>
                <Button 
                  onClick={() => window.open('YOUR_FORM_URL', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                >
                  Contact Us for Pricing
                </Button>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="w-full py-20 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                id="teamSparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={40}
                className="w-full h-full"
                particleColor="#93c5fd"
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Built by a Team Associated With
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Bringing together expertise from top institutions and industry leaders
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {teamLogos.map((item, index) => (
                  <BackgroundGradient key={index} className="rounded-[22px] p-4 sm:p-6 bg-white dark:bg-slate-900">
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        {/* Replace with actual logo images */}
                        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-400">
                          {item.name.split(' ').map(word => word[0]).join('')}
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.role}</p>
                      </div>
                    </div>
                  </BackgroundGradient>
                ))}
              </div>

              <div className="mt-20">
                <InfiniteMovingCards
                  items={[
                    "Technical Innovation",
                    "Business Acumen",
                    "Industry Experience",
                    "Research Excellence",
                    "Global Network",
                    "Proven Track Record",
                  ]}
                  direction="right"
                  speed="slow"
                />
              </div>
            </div>
          </section>
        </main>
      </TracingBeam>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-slate-200">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">AICopilot</h3>
              <p className="text-slate-400 text-sm">
                Transforming marketing with AI-powered insights and automation.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="hover:text-blue-500 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="#" 
                  className="hover:text-blue-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="#" 
                  className="hover:text-blue-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'Features', 'Pricing', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-slate-400 hover:text-blue-500 transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-slate-400 hover:text-blue-500 transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Stay Updated</h3>
              <p className="text-slate-400 text-sm">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <div className="flex flex-col space-y-2">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                  <Button 
                    size="sm"
                    className="absolute right-1 top-1 bg-blue-500 hover:bg-blue-600"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  By subscribing, you agree to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-slate-800" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} AICopilot. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-slate-400">
              <a href="mailto:contact@aicopilot.com" className="flex items-center space-x-2 hover:text-blue-500 transition-colors text-sm">
                <Mail size={16} />
                <span>contact@aicopilot.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 hover:text-blue-500 transition-colors text-sm">
                <Phone size={16} />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
