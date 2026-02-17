import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MinimalBackground } from '@/components/landing/MinimalBackground';
import { Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
    const navigate = useNavigate();

    const pricingData = {
        carbotracker: {
            title: "Carbotracker (The Carbon Calculator)",
            plans: [
                {
                    name: 'SME Essentials',
                    price: '£10',
                    period: '/month',
                    description: 'Basic emissions tracking for small businesses.',
                    features: [
                        'Scopes 1, 2, and 3 Calculation',
                        'Automated data entry for energy, fuel, and waste',
                        'Basic Scope 3 (Commute & Travel)'
                    ],
                    highlight: false,
                    buttonText: 'Get Started'
                },
                {
                    name: 'Corporate Pro',
                    price: '£99',
                    period: '/month',
                    description: 'Advanced tracking for growing companies.',
                    features: [
                        'Full Scope 3 (Supply Chain + Product Lifecycle)',
                        'Multi-site tracking',
                        'Year-on-year benchmarking'
                    ],
                    highlight: true,
                    buttonText: 'Get Started'
                },
                {
                    name: 'Enterprise',
                    price: 'POA',
                    period: '',
                    description: 'Custom solutions for complex needs.',
                    features: [
                        'API integrations with ERP/Accounting software',
                        'Custom emissions factors for specialized industries'
                    ],
                    highlight: false,
                    buttonText: 'Contact Sales'
                }
            ]
        },
        netzeroview: {
            title: "NetZeroView (The Netzero Platform)",
            plans: [
                {
                    name: 'SME Starter',
                    price: '£25',
                    period: '/mo',
                    description: 'Showcase your sustainability journey.',
                    features: [
                        'Simple "Net Zero" badge for your website',
                        'Basic public-facing dashboard'
                    ],
                    highlight: false,
                    buttonText: 'Get Started'
                },
                {
                    name: 'Large Company',
                    price: '£150',
                    period: '/mo',
                    description: 'Comprehensive roadmapping and reporting.',
                    features: [
                        'Detailed roadmapping',
                        'Tracks progress against 2030/2050 targets',
                        'Internal reporting for boards'
                    ],
                    highlight: true,
                    buttonText: 'Get Started'
                },
                {
                    name: 'Enterprise',
                    price: 'Custom / POA',
                    period: '',
                    description: 'Full-scale sustainability management.',
                    features: [
                        'White-label platform',
                        'Group-wide sustainability progress tracking',
                        'Subsidiary management'
                    ],
                    highlight: false,
                    buttonText: 'Contact Sales'
                }
            ]
        },
        carboconnect: {
            title: "CarboConnect (Supplier Engagement Tool)",
            plans: [
                {
                    name: 'SME Starter',
                    price: 'Basic Access',
                    period: '',
                    description: 'For suppliers reporting to clients.',
                    features: [
                        'Small firms needing to report data upward',
                        'Often included in NetZeroView'
                    ],
                    highlight: false,
                    buttonText: 'Get Started'
                },
                {
                    name: 'Large Company',
                    price: '£300 - £600',
                    period: '/mo',
                    description: 'Automated engagement for key suppliers.',
                    features: [
                        'Engaging up to 200 key suppliers',
                        'Automated email requests',
                        'Data collection templates'
                    ],
                    highlight: true,
                    buttonText: 'Get Started'
                },
                {
                    name: 'Enterprise',
                    price: 'Custom Quote',
                    period: '',
                    description: 'Global supply chain management.',
                    features: [
                        'Global supply chains (1,000+ suppliers)',
                        'Auditor-Ready data',
                        'Risk modeling'
                    ],
                    highlight: false,
                    buttonText: 'Contact Sales'
                }
            ]
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col p-6 md:p-12 lg:p-20 overflow-hidden">
            <MinimalBackground />

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="group pl-0 hover:pl-2 transition-all duration-300"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Button>
            </motion.div>

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
                >
                    Simple, Transparent Pricing
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-slate-600"
                >
                    Choose the plan that fits your organization's sustainability goals.
                </motion.p>
            </div>

            {/* Tabs & Pricing Cards */}
            <Tabs defaultValue="carbotracker" className="w-full max-w-7xl mx-auto">
                <div className="flex justify-center mb-12">
                    <TabsList className="grid w-full max-w-2xl grid-cols-1 md:grid-cols-3 h-auto gap-2 bg-slate-100/50 p-2">
                        <TabsTrigger
                            value="carbotracker"
                            className="text-sm md:text-base py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            Carbotracker
                        </TabsTrigger>
                        <TabsTrigger
                            value="netzeroview"
                            className="text-sm md:text-base py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            NetZeroView
                        </TabsTrigger>
                        <TabsTrigger
                            value="carboconnect"
                            className="text-sm md:text-base py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            CarboConnect
                        </TabsTrigger>
                    </TabsList>
                </div>

                {Object.entries(pricingData).map(([key, data]) => (
                    <TabsContent key={key} value={key} className="mt-0">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-semibold text-slate-800">{data.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.plans.map((plan, index) => (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className={`relative p-8 rounded-2xl border ${plan.highlight
                                        ? 'border-blue-200 bg-white/90 shadow-xl ring-1 ring-blue-500/20'
                                        : 'border-slate-200 bg-white/60 hover:bg-white/90 transition-colors'
                                        } backdrop-blur-sm flex flex-col`}
                                >
                                    {plan.highlight && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                                            {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{plan.description}</p>
                                    </div>

                                    <div className="flex-grow mb-8 border-t border-slate-100 pt-6">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Features Included</p>
                                        <ul className="space-y-4">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                                                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button
                                        className={`w-full ${plan.highlight
                                            ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
                                            : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'
                                            }`}
                                        variant={plan.highlight ? 'default' : 'outline'}
                                        size="lg"
                                        onClick={() => navigate('/auth?tab=signup')}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default Pricing;
