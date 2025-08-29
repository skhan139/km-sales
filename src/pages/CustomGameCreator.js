import React, { useState } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation
import './CustomGameCreator.css';

const CustomGameCreator = () => {
  const [formData, setFormData] = useState({
    clubName: '',
    gameName: '', // New field for game name
    topSealPrize: '',
    smallerPayouts: [{ description: '', count: '' }], // Initialize with one empty entry
    profitPercent: '',
    gamesPerCase: '',
    customImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayoutChange = (index, field, value) => {
    const updatedPayouts = [...formData.smallerPayouts];
    updatedPayouts[index][field] = value;
    setFormData({ ...formData, smallerPayouts: updatedPayouts });
  };

  const addPayoutField = () => {
    setFormData({
      ...formData,
      smallerPayouts: [...formData.smallerPayouts, { description: '', count: '' }],
    });
  };

  const removePayoutField = (index) => {
    const updatedPayouts = formData.smallerPayouts.filter((_, i) => i !== index);
    setFormData({ ...formData, smallerPayouts: updatedPayouts });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, customImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(formData.clubName || 'Your Club Name', 10, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Game Name: ${formData.gameName || 'Your Game Name'}`, 10, 30);
    doc.text(`Top Seal Prize: ${formData.topSealPrize || 'Enter a prize'}`, 10, 40);

    doc.text('Smaller Payouts:', 10, 50);
    formData.smallerPayouts.forEach((payout, index) => {
      doc.text(
        `${index + 1}. ${payout.description || 'Enter payout'} - ${payout.count || 'Enter count'} winners`,
        10,
        60 + index * 10
      );
    });

    doc.text(`Profit Percentage: ${formData.profitPercent || 'Enter %'}%`, 10, 70 + formData.smallerPayouts.length * 10);
    doc.text(`Games Per Case: ${formData.gamesPerCase || 'Enter number'}`, 10, 80 + formData.smallerPayouts.length * 10);

    // Add the club logo if available
    if (formData.customImage) {
      doc.addImage(formData.customImage, 'JPEG', 150, 10, 40, 40); // Position and size of the image
    }

    // Save the PDF
    doc.save(`${formData.clubName || 'CustomGamePoster'}.pdf`);
  };

  return (
    <div className="custom-game-creator">
      <div className="form-container">
        <h2>Build Your Custom Game</h2>
        <form>
          <label>
            Club Name:
            <input
              type="text"
              name="clubName"
              value={formData.clubName}
              onChange={handleInputChange}
              placeholder="Enter your club name"
            />
          </label>
          <label>
            Game Name:
            <input
              type="text"
              name="gameName"
              value={formData.gameName}
              onChange={handleInputChange}
              placeholder="Enter your game name"
            />
          </label>
          <label>
            Top Seal Prize:
            <input
              type="text"
              name="topSealPrize"
              value={formData.topSealPrize}
              onChange={handleInputChange}
              placeholder="Enter top seal prize"
            />
          </label>
          <label>
            Smaller Payouts:
            {formData.smallerPayouts.map((payout, index) => (
              <div key={index} className="payout-field">
                <input
                  type="text"
                  value={payout.description}
                  onChange={(e) => handlePayoutChange(index, 'description', e.target.value)}
                  placeholder={`Payout ${index + 1} Description`}
                />
                <input
                  type="number"
                  value={payout.count}
                  onChange={(e) => handlePayoutChange(index, 'count', e.target.value)}
                  placeholder="Count"
                  className="payout-count-field"
                />
                <button
                  type="button"
                  className="remove-payout-button"
                  onClick={() => removePayoutField(index)}
                  disabled={formData.smallerPayouts.length === 1} // Prevent removing the last field
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="add-payout-button" onClick={addPayoutField}>
              Add Payout
            </button>
          </label>
          <label>
            Profit Percentage:
            <input
              type="number"
              name="profitPercent"
              value={formData.profitPercent}
              onChange={handleInputChange}
              placeholder="Enter profit percentage"
            />
          </label>
          <label>
            Games Per Case:
            <input
              type="number"
              name="gamesPerCase"
              value={formData.gamesPerCase}
              onChange={handleInputChange}
              placeholder="Enter number of games per case"
            />
          </label>
          <label>
            Upload Club Logo:
            <input type="file" onChange={handleImageUpload} />
          </label>
        </form>
      </div>

      <div className="preview-container">
        <h2>Game Poster Preview</h2>
        <div className="game-card">
          {formData.customImage && (
            <img src={formData.customImage} alt="Club Logo" className="club-logo" />
          )}
          <h3>{formData.clubName || 'Your Club Name'}</h3>
          <h4>{formData.gameName || 'Your Game Name'}</h4>
          <p><strong>Top Seal Prize:</strong> {formData.topSealPrize || 'Enter a prize'}</p>
          <p><strong>Smaller Payouts:</strong></p>
          <div className="payouts-column">
            {formData.smallerPayouts.map((payout, index) => (
              <div key={index} className="payout-item">
                <span>{payout.description || 'Enter payout'}</span>
                <span>{payout.count || 'Enter count'} winners</span>
              </div>
            ))}
          </div>
          <p><strong>Profit Percentage:</strong> {formData.profitPercent || 'Enter %'}%</p>
          <p><strong>Games Per Case:</strong> {formData.gamesPerCase || 'Enter number'}</p>
        </div>
        <button className="download-pdf-button" onClick={downloadPDF}>
          Download Poster as PDF
        </button>
        <p className="email-instructions">
    To create your custom game, download the poster with your game specs and email it 
    <a href="mailto:skhan139@icloud.com"> here</a>. We will get back to you to start the process.
  </p>
      </div>
    </div>
  );
};

export default CustomGameCreator;