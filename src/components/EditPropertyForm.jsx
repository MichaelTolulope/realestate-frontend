import { useState } from "react";
import { toast } from "sonner";
import supabase from "../util/supabase";

const EditPropertyForm = ({ property, additionalStyles }) => {
    const [formData, setFormData] = useState({
        name: property.name || "",
        description: property.description || "",
        active: property.active || "",
        type: property.type || "",
        price: property.price || "",
        imageURLs: property.images || [],
        area: property["land-area"] || "",
        bathroom: property.bathrooms || "",
        bedroom: property.bedrooms || "",
        ammenities: property.ammenities || "",
        location: property.address || "",
        tags: property.tags || "",
        propertyType: property.propertyType || "",
        parking: property.parking || "",
    });

    const [editField, setEditField] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleEdit = (field) => {
        setEditField(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const { data, error } = await supabase
            .from("listing")
            .update({
                name: formData.name,
                description: formData.description,
                active: formData.active,
                type: formData.type,
                price: formData.price,
                images: formData.imageURLs,
                "land-area": formData.area,
                bathrooms: formData.bathroom,
                bedrooms: formData.bedroom,
                ammenities: formData.ammenities,
                address: formData.location,
                tags: formData.tags,
                propertyType: formData.propertyType,
                parking: formData.parking,
            })
            .eq("id", property.id);

        setIsSaving(false);

        if (error) {
            toast.error("Error saving property. Try again.");
            console.error(error);
        } else {
            toast.success("Property updated successfully!");
        }
    };

    const renderInput = (label, field, type = "text") => (
        <div className="relative">
            <label>{label}</label>
            <input
                type={type}
                className="border p-3 rounded-xl w-full pr-10"
                disabled={!editField[field]}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
            />
            <span
                className="absolute right-4 top-11 cursor-pointer text-gray-500"
                onClick={() => toggleEdit(field)}
                title="Edit"
            >
                ✏️
            </span>
        </div>
    );

    return (
        <form
            onSubmit={handleSubmit}
            className={`shadow-lg rounded-2xl w-full flex flex-col bg-white gap-3 p-4 ${additionalStyles}`}
        >
            <div className="flex justify-between items-center">
                <h3>Edit Property</h3>
                <a href="/dashboard">
                    <h4 className="text-blue-600 underline">Go to Dashboard</h4>
                </a>
            </div>

            {renderInput("Title", "name")}
            {/* {renderInput("Description", "description")} */}
            {renderInput("Price", "price", "number")}
            {renderInput("Area (sq ft)", "area")}
            {renderInput("Bedrooms", "bedroom", "number")}
            {renderInput("Bathrooms", "bathroom", "number")}
            {renderInput("Ammenities", "ammenities")}
            {renderInput("Location", "location")}
            {renderInput("Tags", "tags")}
            {renderInput("Parking", "parking")}

            <div className="relative">
                <label>Property Type</label>
                <input
                    className="border p-3 rounded-xl w-full pr-10"
                    disabled={!editField["type"]}
                    value={formData.propertyType}
                    onChange={(e) => handleChange("type", e.target.value)}
                />
                <span
                    className="absolute right-4 top-11 cursor-pointer text-gray-500"
                    onClick={() => toggleEdit("propertyType")}
                >
                    ✏️
                </span>
            </div>
            <div className="relative">
                <label>Description</label>
                <textarea
                    rows={5}
                    className="border p-3 rounded-xl w-full pr-10"
                    disabled={!editField["description"]}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                ></textarea>
                <span
                    className="absolute right-4 top-11 cursor-pointer text-gray-500"
                    onClick={() => toggleEdit("description")}
                >
                    ✏️
                </span>
            </div>

            <div className="relative">
                <label>Type</label>
                <select
                    className="border p-3 rounded-xl w-full pr-10"
                    disabled={!editField["type"]}
                    value={formData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                </select>
                <span
                    className="absolute right-5 top-11 cursor-pointer text-gray-500"
                    onClick={() => toggleEdit("type")}
                >
                    ✏️
                </span>
            </div>
            <div className="relative">
                <label>Active</label>
                <select
                    className="border p-3 rounded-xl w-full pr-10"
                    disabled={!editField["active"]}
                    value={formData.active ? "TRUE" : "FALSE"} // convert boolean to string
                    onChange={(e) =>
                        handleChange("active", e.target.value === "TRUE") // convert string back to boolean
                    }
                >
                    <option value="TRUE">TRUE</option>
                    <option value="FALSE">FALSE</option>
                </select>
                <span
                    className="absolute right-5 top-11 cursor-pointer text-gray-500"
                    onClick={() => toggleEdit("active")}
                >
                    ✏️
                </span>
            </div>


            <button
                type="submit"
                className="bg-black text-white border p-3 rounded-xl cursor-pointer"
                disabled={isSaving}
            >
                {isSaving ? "Saving changes..." : "Save Changes"}
            </button>
        </form>
    );
};

export default EditPropertyForm;
