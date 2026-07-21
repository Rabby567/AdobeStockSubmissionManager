import Layout from "../components/Layout";
import toast from "react-hot-toast";
import AssetValidationReport from "../components/review/AssetValidationReport";
import AssetValidationCard from "../components/review/AssetValidationCard";
import { useTemplateStore } from "../store/useTemplateStore";
import { useState, useEffect } from "react";
import ReviewHeader from "../components/review/ReviewHeader";
import GoogleUploadCard from "../components/review/GoogleUploadCard";
import ReviewDesktopCard from "../components/review/ReviewDesktopCard";
import { useSubmissionStore } from "../store/submissionStore";
import Button from "../components/ui/Button";

import {
  detectCategory
} from "../services/categoryDetector";
import {
  validateTemplate
} from "../services/validationEngine";

import ReviewCompactCard from "../components/review/ReviewCompactCard";


import {
  useCategoryStore
} from "../store/useCategoryStore";

export default function Review() {
  const rules =
  useCategoryStore(
    (state) => state.rules
  );

  const templates = useTemplateStore(
    (state) => state.templates
  );

  const updateTemplate = useTemplateStore(
    (state) => state.updateTemplate
  );

  const removeTemplate =
  useTemplateStore(
    (state) => state.removeTemplate
  );

  const updateFilenamePrefix =
useTemplateStore(
(state)=>state.updateFilenamePrefix
);

  const [googleProgress, setGoogleProgress] =
  useState(0);

  const [isCompact, setIsCompact] =
  useState(window.innerWidth < 1450);

  const [showAssetReport, setShowAssetReport] =
  useState(false);
  

const setTemplates =
  useTemplateStore(
    (state) => state.setTemplates
  );

  const {
  date,
  batchNumber,
  setDate,
  setBatchNumber,
} = useSubmissionStore();


  useEffect(() => {

  window.electronAPI
    .onGoogleProgress(
      (progress) => {

        setGoogleProgress(
          progress
        );

      }
    );

}, []);

useEffect(() => {
  const handleResize = () => {
    setIsCompact(
      window.innerWidth < 1450
    );
  };

  window.addEventListener(
    "resize",
    handleResize
  );

  return () =>
    window.removeEventListener(
      "resize",
      handleResize
    );
}, []);

const generateExcel = async () => {
  

  try {
  
      await window.electronAPI.generateExcel(
        templates
      );

    toast.success("Excel generated successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to generate Excel");
  }
};


const generatePackages = async () => {
  try {

    
      await window.electronAPI
        .generatePackages(
          templates
        );

    toast.success(
  "ZIP packages created successfully"
);

  } catch (error) {
    console.error(error);

    toast.error(
  "Failed to generate ZIP packages"
);
  }
};

const redetectCategories = () => {

  const updatedTemplates =
    templates.map((item) => ({

      ...item,

      category:
        detectCategory(
          item.title,
          rules
        ),
    }));

  setTemplates(
    updatedTemplates
  );

  toast.success(
  "Categories updated successfully"
);
};

const saveSubmissionSettings = () => {

if (!date || !batchNumber) {

toast.error(
"Date and Batch Number required"
);

return;

}

updateFilenamePrefix(
date,
batchNumber
);

toast.success(
"Submission Settings Updated"
);

};
  

  return (
    <Layout>
    <div
      style={{
        padding: "20px",
      }}
    >
 
<ReviewHeader
  onGenerateExcel={generateExcel}
  onGeneratePackages={generatePackages}
/>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    gap: "24px",
    marginTop: "30px",
    alignItems: "stretch",
  }}
>



<div
style={{
background:"#fff",
borderRadius:"18px",
padding:"24px",
boxShadow:"0 8px 24px rgba(0,0,0,.06)",
display:"flex",
flexDirection:"column",
justifyContent:"space-between"
}}
>

<h3>Submission Settings</h3>

<label
style={{
  marginTop:"10px",
}}
>Date</label>

<input
value={date}
onChange={(e)=>setDate(e.target.value)}
style={{
width:"100%",
height:"42px",
padding:"0 12px",
marginTop:"6px",
marginBottom:"16px",
border:"1px solid #d1d5db",
borderRadius:"10px",
fontSize:"14px"
}}
/>

<label
style={{
  marginTop:"-8px",
}}
>Batch Number</label>

<input
value={batchNumber}
onChange={(e)=>setBatchNumber(e.target.value)}
style={{
width:"100%",
height:"42px",
padding:"0 12px",
marginTop:"6px",
border:"1px solid #d1d5db",
borderRadius:"10px",
fontSize:"14px"
}}
/>

<div
  style={{
    display: "flex",
    justifyContent: "left",
    marginTop: "18px",
  }}
>
  <Button
    color="blue"
    variant="solid"
    size="md"
    onClick={saveSubmissionSettings}
    loadingText="Saving..."
    successText="Saved"
  >
    💾 Save Changes
  </Button>
</div>



</div>

<GoogleUploadCard
    progress={googleProgress}
    onRedetect={redetectCategories}
/>

<AssetValidationCard
    templates={templates}
    onViewReport={() =>
        setShowAssetReport(true)
    }
/>

</div>


<div
  style={{
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    marginTop: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,.06)",
    overflowX: "auto",
  }}
>


<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  }}
>
  <h2
    style={{
      margin: 0,
      fontSize: "22px",
      fontWeight: 700,
      color: "#1f2937",
    }}
  >
    Review Templates
  </h2>

  <div
    style={{
      background: "#eef4ff",
      color: "#2563eb",
      padding: "8px 16px",
      borderRadius: "999px",
      fontWeight: 700,
      fontSize: "14px",
    }}
  >
    {templates.length} Templates
  </div>
</div>

{!isCompact && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
      "6% 24% 6% 9% 7% 7% 16% 8% 9%",
      gap: "14px",
      alignItems: "center",
      padding: "14px 18px",
      background: "#f8fafc",
      borderBottom: "2px solid #e5e7eb",
      fontSize: "13px",
      fontWeight: 700,
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: ".5px",
    }}
  >
    
    <div>Preview</div>
    <div>Title</div>
    <div>Category</div>
    <div>Size</div>
    <div>Pages</div>
    <div>Color</div>
    <div>Keywords</div>
    <div>Status</div>
    <div>Action</div>
  </div>
)}


<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  }}
>
  {templates.map((item, index) => {
  const allErrors = validateTemplate(item);

  const isValid = allErrors.length === 0;

  return isCompact ? (
  <ReviewCompactCard
    key={index}
    item={item}
    index={index}
    rules={rules}
    updateTemplate={updateTemplate}
    isValid={isValid}
    allErrors={allErrors}
  />
) : (
  <ReviewDesktopCard
    key={index}
    item={item}
    index={index}
    rules={rules}
    updateTemplate={updateTemplate}
    removeTemplate={removeTemplate}
    isValid={isValid}
    allErrors={allErrors}
  />
);
  })}
</div>

  
</div>

    </div>

    {showAssetReport && (
  <AssetValidationReport
    templates={templates}
    onClose={() => setShowAssetReport(false)}
  />
)}

    </Layout>
  );
}