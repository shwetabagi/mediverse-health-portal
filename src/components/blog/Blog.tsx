
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Clock, 
  User, 
  Heart, 
  Share2, 
  BookOpen,
  TrendingUp,
  Eye,
  Filter
} from 'lucide-react';

export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: 1,
      title: '10 Heart-Healthy Foods to Include in Your Diet',
      excerpt: 'Discover the best foods for cardiovascular health and learn how to incorporate them into your daily meals for a stronger heart.',
      content: 'Heart disease remains one of the leading causes of death worldwide...',
      author: 'Dr. Sarah Johnson',
      category: 'Nutrition',
      readTime: '5 min read',
      publishedAt: '2024-01-12',
      views: 1248,
      likes: 89,
      featured: true,
      image: '/api/placeholder/400/200',
      tags: ['heart health', 'nutrition', 'diet', 'prevention']
    },
    {
      id: 2,
      title: 'Managing Stress: Simple Techniques for Better Mental Health',
      excerpt: 'Learn effective stress management techniques that can improve your mental well-being and overall quality of life.',
      content: 'In today\'s fast-paced world, stress has become an inevitable part...',
      author: 'Dr. Michael Chen',
      category: 'Mental Health',
      readTime: '7 min read',
      publishedAt: '2024-01-10',
      views: 967,
      likes: 156,
      featured: false,
      image: '/api/placeholder/400/200',
      tags: ['stress', 'mental health', 'wellness', 'mindfulness']
    },
    {
      id: 3,
      title: 'The Importance of Regular Health Screenings',
      excerpt: 'Understanding when and why you need health screenings can help detect problems early and maintain optimal health.',
      content: 'Prevention is always better than cure, and regular health screenings...',
      author: 'Dr. Emily Rodriguez',
      category: 'Prevention',
      readTime: '6 min read',
      publishedAt: '2024-01-08',
      views: 743,
      likes: 92,
      featured: true,
      image: '/api/placeholder/400/200',
      tags: ['screening', 'prevention', 'health check', 'early detection']
    },
    {
      id: 4,
      title: 'Exercise Guidelines for Different Age Groups',
      excerpt: 'Discover age-appropriate exercise recommendations to stay fit and healthy throughout your life.',
      content: 'Physical activity is crucial for maintaining health at every age...',
      author: 'Dr. James Wilson',
      category: 'Fitness',
      readTime: '8 min read',
      publishedAt: '2024-01-06',
      views: 1156,
      likes: 134,
      featured: false,
      image: '/api/placeholder/400/200',
      tags: ['exercise', 'fitness', 'age groups', 'physical activity']
    },
    {
      id: 5,
      title: 'Understanding Common Skin Conditions',
      excerpt: 'Learn about prevalent skin conditions, their symptoms, and when to seek professional medical advice.',
      content: 'Our skin is the body\'s largest organ and often reflects our overall health...',
      author: 'Dr. Lisa Anderson',
      category: 'Dermatology',
      readTime: '9 min read',
      publishedAt: '2024-01-04',
      views: 892,
      likes: 78,
      featured: false,
      image: '/api/placeholder/400/200',
      tags: ['dermatology', 'skin care', 'conditions', 'treatment']
    },
    {
      id: 6,
      title: 'Sleep Hygiene: Tips for Better Rest',
      excerpt: 'Improve your sleep quality with these evidence-based tips and create a better bedtime routine.',
      content: 'Quality sleep is fundamental to good health and well-being...',
      author: 'Dr. Robert Kim',
      category: 'Sleep Health',
      readTime: '6 min read',
      publishedAt: '2024-01-02',
      views: 1334,
      likes: 198,
      featured: true,
      image: '/api/placeholder/400/200',
      tags: ['sleep', 'insomnia', 'rest', 'health']
    }
  ];

  const categories = ['all', 'Nutrition', 'Mental Health', 'Prevention', 'Fitness', 'Dermatology', 'Sleep Health'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Health Tips & Articles</h1>
        <p className="text-green-100">Expert advice and insights for better health and wellness</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold">Featured Articles</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="default">{article.category}</Badge>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <span>{article.publishedAt}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">{article.category}</Badge>
                <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{article.likes}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredArticles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
          </CardContent>
        </Card>
      )}

      {/* Health Tips Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Heart className="h-5 w-5" />
            <span>Quick Health Tips</span>
          </CardTitle>
          <CardDescription className="text-blue-600">
            Simple daily habits for better health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">💧 Stay Hydrated</h4>
              <p className="text-sm text-blue-700">Drink at least 8 glasses of water daily to maintain optimal health.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 mb-2">🥗 Eat Colorfully</h4>
              <p className="text-sm text-green-700">Include fruits and vegetables of different colors in your daily diet.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-800 mb-2">😴 Quality Sleep</h4>
              <p className="text-sm text-purple-700">Aim for 7-9 hours of quality sleep each night for better recovery.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
