"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingBag,
  Star,
  Heart,
  Search,
  User,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  Zap,
  Shield,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

// Typing effect component
const TypingEffect = ({ texts, className = "" }: { texts: string[]; className?: string }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex]

        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1))

          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  )
}

// Header component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ShopMart
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Shop", "Categories", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
            </motion.div>

            {mounted && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
            </motion.div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
              {["Home", "Shop", "Categories", "About", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

// Hero section
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Discover{" "}
              <TypingEffect
                texts={["Amazing Products", "Latest Trends", "Best Deals", "Premium Quality"]}
                className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              />
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Shop the latest collection of premium products with unbeatable prices and fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  View Collection
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <img src="/images/hero-product.jpg" alt="Hero Product" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg"
            >
              <Heart className="w-6 h-6 text-red-500" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg"
            >
              <Star className="w-6 h-6 text-yellow-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Fast Delivery", desc: "Quick shipping worldwide" },
            { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
            { icon: Truck, title: "Free Returns", desc: "30-day return policy" },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-4 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Product card component
const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          >
            <Heart className={`w-5 h-5 ${isLiked ? "text-red-500 fill-current" : "text-gray-600"}`} />
          </motion.button>

          {product.badge && (
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500">
              {product.badge}
            </Badge>
          )}
        </div>

        <CardContent className="p-6">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
          </div>

          <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">{product.name}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-purple-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Featured products section
const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      rating: 5,
      reviews: 124,
      image: "/images/headphones.jpg",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199,
      rating: 4,
      reviews: 89,
      image: "/images/smartwatch.jpg",
      badge: "New",
    },
    {
      id: 3,
      name: "Luxury Leather Bag",
      price: 149,
      originalPrice: 199,
      rating: 5,
      reviews: 67,
      image: "/images/leather-bag.jpg",
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 49,
      rating: 4,
      reviews: 156,
      image: "/images/wireless-charger.jpg",
      badge: "Sale",
    },
    {
      id: 5,
      name: "Premium Coffee Maker",
      price: 179,
      rating: 5,
      reviews: 92,
      image: "/images/coffee-maker.jpg",
    },
    {
      id: 6,
      name: "Smart Home Speaker",
      price: 99,
      originalPrice: 129,
      rating: 4,
      reviews: 203,
      image: "/images/smart-speaker.jpg",
      badge: "Popular",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine quality, style, and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="group bg-transparent">
            View All Products
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// Categories section
const CategoriesSection = () => {
  const categories = [
    { name: "Electronics", image: "/images/electronics-category.jpg", count: 245 },
    { name: "Fashion", image: "/images/fashion-category.jpg", count: 189 },
    { name: "Home & Garden", image: "/images/home-garden-category.jpg", count: 156 },
    { name: "Sports", image: "/images/sports-category.jpg", count: 98 },
    { name: "Books", image: "/images/books-category.jpg", count: 234 },
    { name: "Beauty", image: "/images/beauty-category.jpg", count: 167 },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-indigo-50/50 dark:from-purple-950/10 dark:via-pink-950/10 dark:to-indigo-950/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of categories and find exactly what you're looking for.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} products</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Newsletter section
const NewsletterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated with Latest Trends</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
            offers.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-purple-600 hover:bg-white/90">Subscribe</Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ecommerce
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your premier destination for premium products and exceptional shopping experience.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Shop", "Categories", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {["Help Center", "Returns", "Shipping Info", "Size Guide", "Track Order"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {["Facebook", "Twitter", "Instagram", "YouTube", "LinkedIn"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 StyleHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main component
export default function EcommercePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
