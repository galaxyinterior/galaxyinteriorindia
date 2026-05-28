import { Badge } from '@/components/ui/badge';

const sections = [
    {
        title: "1. Company Overview",
        content: "Galaxy Interior is a professional design and execution firm providing architectural planning, interior design, and turnkey project solutions for residential and commercial clients."
    },
    {
        title: "2. Definitions",
        list: [
            "Company: Galaxy Interior",
            "Client: Individual or organization availing services",
            "Project: Agreed scope of work between Company and Client",
            "Agreement: Signed document outlining scope, cost, and timeline"
        ]
    },
    {
        title: "3. Scope of Work",
        content: "The Company provides the following services:",
        list: [
            "Architectural Design & Planning",
            "2D Drawings & 3D Visualization",
            "Interior Design Consultation",
            "Turnkey Project Execution",
            "Renovation & Custom Interior Solutions"
        ],
        footer: "The scope is strictly limited to what is defined in the Agreement."
    },
    {
        title: "4. Contract & Agreement Policy",
        list: [
            "A written agreement is mandatory for every project",
            "The agreement will include: Scope of Work, Project Timeline, Cost & Payment Terms",
            "Work will commence only after client approval and agreement signing"
        ]
    },
    {
        title: "5. Payment Policy",
        content: "Payments will be milestone-based:",
        list: [
            "30% Advance (Non-refundable)",
            "40% During Execution",
            "20% Mid Completion",
            "10% Before Final Handover"
        ],
        footer: "Delay in payment may result in project delay or work suspension. Applicable taxes (GST) will be charged extra."
    },
    {
        title: "6. Design & Revision Policy",
        list: [
            "Initial design concepts will be presented to the client",
            "Up to 2–3 revisions are included (as per agreement)",
            "Any changes after final approval will be chargeable",
            "Execution will proceed only on the final approved design"
        ]
    },
    {
        title: "7. Material Policy",
        list: [
            "Materials will be finalized only after client approval",
            "Both premium and standard options will be provided",
            "Equivalent materials may be suggested based on market availability",
            "Unauthorized material changes are not permitted"
        ]
    },
    {
        title: "8. Project Timeline Policy",
        content: "The project timeline depends on: Project size, Design complexity, Site conditions.",
        footer: "Possible reasons for delay include: Pending client approvals, Payment delays, Unforeseen site conditions, Force majeure events (natural disasters, government restrictions, etc.)"
    },
    {
        title: "9. Execution & Site Policy",
        subsections: [
            {
                subtitle: "Client Responsibilities:",
                list: [
                    "Provide site access",
                    "Ensure availability of basic utilities (electricity, water)",
                    "Arrange site security"
                ]
            },
            {
                subtitle: "Company Responsibilities:",
                list: [
                    "Provide skilled labor and supervision",
                    "Ensure quality workmanship",
                    "Follow safety standards"
                ]
            }
        ]
    },
    {
        title: "10. Quality & Warranty Policy",
        list: [
            "Workmanship warranty: 6–12 months (as per agreement)",
            "Manufacturer warranty applies to branded materials"
        ],
        subsections: [
            {
                subtitle: "Warranty does not cover:",
                list: [
                    "Physical damage",
                    "External water leakage",
                    "Misuse or negligence"
                ]
            }
        ]
    },
    {
        title: "11. Cancellation Policy",
        subsections: [
            {
                subtitle: "In case of client cancellation:",
                list: [
                    "Advance payment is non-refundable",
                    "Payment for completed work is mandatory"
                ]
            }
        ],
        footer: "Company may cancel the project in exceptional cases with valid justification"
    },
    {
        title: "12. Refund Policy",
        list: [
            "Advance payment is non-refundable",
            "Refunds, if any, will be processed on a case-to-case basis at company discretion"
        ]
    },
    {
        title: "13. Limitation of Liability",
        list: [
            "The Company shall not be liable for indirect or consequential losses",
            "Maximum liability shall be limited to the total project cost"
        ]
    },
    {
        title: "14. Intellectual Property Rights",
        list: [
            "All designs, drawings, and concepts remain the property of Galaxy Interior",
            "Clients are not permitted to reuse or share designs without written consent"
        ]
    },
    {
        title: "15. Confidentiality Policy",
        list: [
            "Client information will be kept confidential",
            "The Company may use project visuals/images for marketing purposes unless the client objects in writing"
        ]
    },
    {
        title: "16. Legal & Jurisdiction",
        list: [
            "All disputes will be attempted to resolve amicably",
            "Legal jurisdiction shall be Jharkhand, India"
        ]
    },
    {
        title: "17. Amendments",
        content: "The Company reserves the right to update or modify these terms at any time. Updated terms will be applicable through revised agreements."
    },
    {
        title: "18. Acceptance of Terms",
        content: "By signing the agreement or initiating the project, the client acknowledges acceptance of all terms and policies."
    },
    {
        title: "19. Contact Information",
        content: "Galaxy Interior",
        list: [
            "Locations: Godda | Bhagalpur | Banka | Hazaribagh | Ranchi",
            "Phone: +91 96319 80881, +91 92342 76599",
            "Email: info@galaxyinteriorindia.com"
        ]
    }
];

export default function TermsPage() {
    return (
        <div className="bg-white">
            <section className="py-32 bg-galaxy-dark text-white text-center">
                <div className="container mx-auto px-4">
                    <Badge className="mb-6 rounded-none bg-primary text-galaxy-dark font-bold tracking-[0.3em] px-6 py-2">LEGAL</Badge>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">Terms & Conditions</h1>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-lg max-w-none text-gray-600">
                        <p className="mb-12 text-xl font-medium text-galaxy-dark">
                            Welcome to Galaxy Interior. Please read these Terms and Conditions carefully before engaging our services.
                        </p>

                        <div className="space-y-12">
                            {sections.map((section, index) => (
                                <div key={index} className="space-y-4">
                                    <h2 className="text-2xl font-bold text-galaxy-dark">{section.title}</h2>
                                    {section.content && <p>{section.content}</p>}
                                    {section.list && (
                                        <ul className="list-disc pl-6 space-y-2">
                                            {section.list.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.subsections && section.subsections.map((sub, i) => (
                                        <div key={i} className="mt-4 space-y-2">
                                            <p className="font-bold text-galaxy-dark">{sub.subtitle}</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                {sub.list.map((item, j) => (
                                                    <li key={j}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    {section.footer && <p className="italic text-gray-500 mt-2">{section.footer}</p>}
                                </div>
                            ))}
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
