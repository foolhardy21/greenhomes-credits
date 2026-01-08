export const CERTIFICATION_TYPES = {

}

export const CATEGORIES = {
    SD: "Sustainable Design",
    WC: "Water Conservation",
    EE: "Energy Efficiency",
    MR: "Materials & Resources",
    RHW: "Resident Health & Wellbeing",
    ID: "Innovation & Design",
}

export const CREDIT_DISTRIBUTION = {
    SD: [
        {
            name: "Local Building Regulations",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Soil Erosion Control",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Natural Topography & Vegetation",
            points: { yes: 0, maybe: 0, no: 0, max: 4 },
            notes: "",
            required: false,
        },
        {
            name: "Heat Island Effect – Roof & Non-roof",
            points: { yes: 0, maybe: 0, no: 0, max: 4 },
            notes: "",
            required: false,
        },
        {
            name: "Passive Architecture",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Universal Design",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Green Parking Facility",
            points: { yes: 0, maybe: 0, no: 0, max: 4 },
            notes: "",
            required: false,
        },
        {
            name: "Access to Amenities",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Basic Facilities for Construction Workforce",
            points: { yes: 0, maybe: 0, no: 0, max: 1 },
            notes: "",
            required: false,
        },
        {
            name: "Green Education & Awareness",
            points: { yes: 0, maybe: 0, no: 0, max: 1 },
            notes: "",
            required: false,
        },
    ],
    WC: [
        {
            name: "Water Efficient Plumbing Fixtures",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Rainwater Harvesting",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Water Efficient Plumbing Fixtures (Credit)",
            points: { yes: 0, maybe: 0, no: 0, max: 6 },
            notes: "",
            required: false,
        },
        {
            name: "Landscape Design",
            points: { yes: 0, maybe: 0, no: 0, max: 3 },
            notes: "",
            required: false,
        },
        {
            name: "Management of Irrigation System",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Recycle & Reuse of Waste Water",
            points: { yes: 0, maybe: 0, no: 0, max: 4 },
            notes: "",
            required: false,
        },
        {
            name: "Water Quality",
            points: { yes: 0, maybe: 0, no: 0, max: 1 },
            notes: "",
            required: false,
        },
        {
            name: "Enhanced Rainwater Harvesting",
            points: { yes: 0, maybe: 0, no: 0, max: 4 },
            notes: "",
            required: false,
        },
        {
            name: "Water Metering",
            points: { yes: 0, maybe: 0, no: 0, max: 3 },
            notes: "",
            required: false,
        },
    ],
    EE: [
        {
            name: "HCFC Free Equipment",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Minimum Energy Performance",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Enhanced Energy Performance",
            points: { yes: 0, maybe: 0, no: 0, max: 10 },
            notes: "",
            required: false,
        },
        {
            name: "Alternate Water Heating System",
            points: { yes: 0, maybe: 0, no: 0, max: 3 },
            notes: "",
            required: false,
        },
        {
            name: "On-site Renewable Energy – Common Area Lighting",
            points: { yes: 0, maybe: 0, no: 0, max: 4 },
            notes: "",
            required: false,
        },
        {
            name: "Energy Efficiency in Common Area Equipment",
            points: { yes: 0, maybe: 0, no: 0, max: 1 },
            notes: "",
            required: false,
        },
        {
            name: "Integrated Energy Monitoring System",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
    ],
    MR: [
        {
            name: "Separation of Household Waste",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Green Procurement Policy",
            points: { yes: 0, maybe: 0, no: 0, max: 1 },
            notes: "",
            required: false,
        },
        {
            name: "Optimisation on Structural Design",
            points: { yes: 0, maybe: 0, no: 0, max: 1 },
            notes: "",
            required: false,
        },
        {
            name: "Certified Green Products",
            points: { yes: 0, maybe: 0, no: 0, max: 5 },
            notes: "",
            required: false,
        },
        {
            name: "Local Materials",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Eco-friendly Wood Based Materials",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Alternate Construction Material",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Handling of Construction & Demolition Waste",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Organic Waste Treatment Post Occupancy",
            points: { yes: 0, maybe: 0, no: 0, max: 3 },
            notes: "",
            required: false,
        },
    ],
    RHW: [
        {
            name: "Minimum Daylighting (50%)",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Ventilation Design",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "No Smoking Policy",
            points: { yes: 0, maybe: 0, no: 0, max: 0 },
            notes: "",
            required: true,
        },
        {
            name: "Enhanced Daylighting",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Enhanced Ventilation Design",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Cross Ventilation",
            points: { yes: 0, maybe: 0, no: 0, max: 4 },
            notes: "",
            required: false,
        },
        {
            name: "Connectivity to Exteriors",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Low VOC Materials, Paints & Adhesives",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Facility for Physical Wellbeing",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
    ],
    ID: [
        {
            name: "Innovation",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "Exemplary Performance",
            points: { yes: 0, maybe: 0, no: 0, max: 2 },
            notes: "",
            required: false,
        },
        {
            name: "IGBC Accredited Professional",
            points: { yes: 0, maybe: 0, no: 0, max: 1 },
            notes: "",
            required: false,
        },

    ],
}