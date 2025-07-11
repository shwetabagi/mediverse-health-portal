
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, BookOpen, TrendingUp } from 'lucide-react';
import { BlogPost } from './BlogPost';

export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: '1',
      title: '10 Essential Tips for Heart Health',
      excerpt: 'Learn about the most important steps you can take to maintain a healthy heart and prevent cardiovascular disease.',
      content: `Learn about the most important steps you can take to maintain a healthy heart and prevent cardiovascular disease. Regular exercise is crucial for heart health - aim for at least 150 minutes of moderate-intensity aerobic activity per week. This can include brisk walking, swimming, cycling, or dancing.

Maintain a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit sodium intake to less than 2,300mg per day, and avoid trans fats and excessive saturated fats. Include omega-3 rich foods like fish, walnuts, and flaxseeds.

Monitor your blood pressure regularly and keep it under control. High blood pressure is often called the "silent killer" because it typically has no symptoms but can lead to serious complications.

Manage stress through relaxation techniques, meditation, yoga, or other activities you enjoy. Chronic stress can contribute to heart disease and other health problems.

Get adequate sleep - 7-9 hours per night for most adults. Poor sleep quality and duration are linked to increased risk of heart disease.

Don't smoke, and if you do, quit as soon as possible. Smoking damages blood vessels and significantly increases your risk of heart disease and stroke.

Limit alcohol consumption to moderate levels - up to one drink per day for women and up to two drinks per day for men.`,
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Heart Health',
      image: '/api/placeholder/400/200',
      likes: 124,
      isLiked: false
    },
    {
      id: '2',
      title: 'Understanding Mental Health: Breaking the Stigma',
      excerpt: 'Mental health is just as important as physical health. Explore ways to support your mental wellbeing and when to seek help.',
      content: `Mental health is just as important as physical health. Explore ways to support your mental wellbeing and when to seek help. Mental health affects how we think, feel, and act. It influences how we handle stress, relate to others, and make decisions.

Common mental health conditions include anxiety disorders, depression, bipolar disorder, and post-traumatic stress disorder (PTSD). These conditions are real, common, and treatable.

Signs that you might need professional help include persistent sadness, excessive worry, extreme mood changes, withdrawal from friends and activities, significant changes in eating or sleeping patterns, and thoughts of self-harm.

Ways to maintain good mental health include staying connected with family and friends, engaging in regular physical activity, getting enough sleep, eating a balanced diet, practicing relaxation techniques, and seeking help when needed.

It's important to remember that seeking help for mental health issues is a sign of strength, not weakness. Just as you would see a doctor for a physical ailment, it's important to seek professional help for mental health concerns.

Treatment options may include therapy, medication, lifestyle changes, or a combination of these approaches. Many people find that a combination of treatments works best for them.`,
      author: 'Dr. Michael Chen',
      date: '2024-01-12',
      readTime: '7 min read',
      category: 'Mental Health',
      image: '/api/placeholder/400/200',
      likes: 89,
      isLiked: true
    },
    {
      id: '3',
      title: 'Nutrition Basics: Fueling Your Body Right',
      excerpt: 'Discover the fundamentals of good nutrition and how to make healthier food choices for optimal wellness.',
      content: `Discover the fundamentals of good nutrition and how to make healthier food choices for optimal wellness. Good nutrition is the foundation of good health and provides the energy and nutrients your body needs to function properly.

The key components of a healthy diet include carbohydrates (your body's main source of energy), proteins (essential for building and repairing tissues), fats (important for brain function and hormone production), vitamins and minerals (support various body functions), and water (essential for all body processes).

Focus on eating a variety of foods from all food groups. Fill half your plate with fruits and vegetables, choose whole grains over refined grains, include lean protein sources, and incorporate healthy fats like those found in nuts, seeds, and olive oil.

Portion control is important. Use smaller plates and bowls, eat slowly and mindfully, and listen to your body's hunger and fullness cues.

Stay hydrated by drinking plenty of water throughout the day. Limit sugary drinks, excessive caffeine, and alcohol.

Plan and prepare meals in advance when possible. This helps you make healthier choices and avoid relying on processed or fast foods.

Read nutrition labels to understand what you're eating. Pay attention to serving sizes, calories, and the amounts of sodium, sugar, and unhealthy fats.`,
      author: 'Dr. Emily Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Nutrition',
      image: '/api/placeholder/400/200',
      likes: 156,
      isLiked: false
    },
    {
      id: '4',
      title: 'The Importance of Regular Exercise',
      excerpt: 'Physical activity is crucial for maintaining good health. Learn about different types of exercise and their benefits.',
      content: `Physical activity is crucial for maintaining good health. Learn about different types of exercise and their benefits. Regular exercise provides numerous physical and mental health benefits and is one of the most important things you can do for your health.

Types of exercise include aerobic exercise (cardio), strength training, flexibility exercises, and balance training. A well-rounded fitness program should include all four types.

Aerobic exercise strengthens your heart and lungs, improves circulation, helps control weight, and reduces the risk of chronic diseases. Examples include walking, running, swimming, cycling, and dancing.

Strength training builds muscle mass, increases bone density, improves metabolism, and helps with daily activities. You can use weights, resistance bands, or your own body weight.

Flexibility exercises help maintain range of motion in your joints and can reduce the risk of injury. Yoga and stretching are great examples.

Balance training becomes increasingly important as we age to prevent falls and maintain independence.

Start slowly if you're new to exercise. Begin with just 10-15 minutes of activity per day and gradually increase the duration and intensity.

Find activities you enjoy - you're more likely to stick with exercise if it's fun. This could be dancing, hiking, playing sports, or working in the garden.

Make exercise a social activity by working out with friends or family members.`,
      author: 'Dr. James Wilson',
      date: '2024-01-08',
      readTime: '8 min read',
      category: 'Fitness',
      image: '/api/placeholder/400/200',
      likes: 203,
      isLiked: false
    }
  ];

  const categories = ['all', 'Heart Health', 'Mental Health', 'Nutrition', 'Fitness', 'Wellness'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Health Tips & Articles</h1>
        <p className="text-purple-100">Stay informed with the latest health insights and wellness tips</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search health topics..."
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
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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

      {/* Featured Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{blogPosts.length}</h3>
            <p className="text-gray-600">Health Articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">
              {blogPosts.reduce((sum, post) => sum + post.likes, 0)}
            </h3>
            <p className="text-gray-600">Total Likes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{categories.length - 1}</h3>
            <p className="text-gray-600">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all categories.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
