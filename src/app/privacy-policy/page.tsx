import { Badge } from '@/components/ui/badge';

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white">
            <section className="py-32 bg-galaxy-dark text-white text-center">
                <div className="container mx-auto px-4">
                    <Badge className="mb-6 rounded-none bg-primary text-galaxy-dark font-bold tracking-[0.3em] px-6 py-2">LEGAL</Badge>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">Privacy Policy</h1>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-12">
                        <p className="text-xl font-medium text-galaxy-dark mb-12">
                            At Galaxy Interior, we are committed to protecting your privacy. This policy outlines how we handle your personal information and project data.
                        </p>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-galaxy-dark">1. Data Collection</h2>
                            <p>
                                We collect information that you provide directly to us through our website contact forms, consultations, and project agreements. This may include your name, email address, phone number, and project location.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-galaxy-dark">2. Use of Information</h2>
                            <p>
                                The information we collect is used solely to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide and manage our services</li>
                                <li>Communicate with you regarding your project</li>
                                <li>Process payments and agreements</li>
                                <li>Improve our service offerings</li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-galaxy-dark">3. Confidentiality Policy</h2>
                            <p>
                                As part of our commitment to our clients:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Client information will be kept strictly confidential.</li>
                                <li>The Company may use project visuals/images for marketing purposes (such as portfolio showcases) unless the client objects in writing.</li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-galaxy-dark">4. Third-Party Sharing</h2>
                            <p>
                                We do not sell or lease your personal information to third parties. Information may only be shared with trusted contractors or vendors who assist in project execution, under strict confidentiality agreements.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-galaxy-dark">5. Security</h2>
                            <p>
                                We implement appropriate administrative and technical measures to safeguard your personal information against unauthorized access or disclosure.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-galaxy-dark">6. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <p className="font-bold text-galaxy-dark">
                                Galaxy Interior<br />
                                Email: info@galaxyinterior.com<br />
                                Phone: +91 96319 80881
                            </p>
                        </div>

                        <div className="mt-20 pt-10 border-t border-gray-100 italic text-sm">
                            <p>Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
