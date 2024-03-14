import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function generatePDFReport() {
  return new Promise(async (resolve, reject) => {
    const reportData = {
      motorId: "5010-33-FDM-03",
      make: "BHEL",
      rating: 600,
      voltage: 6600,
      current: 64.5,
      insulationClass: "F",
      frequency: 50,
      speed: 1479,
      performanceSummary: {
        bottomLine:
          "This induction motor is operating normally, no action is required.",
        powerFactor: "Power factor is below 0.85, see detailed report.",
        current: "Current variation is within normal limits.",
        voltage: "Voltage variation is within normal limits.",
        load: "Load on the induction motor is less than 25%.",
        phaseConnection: "Connections are normal.",
        stator: "Stator health is normal.",
        rotorStatorAirGap:
          "Dynamic or static eccentricity indications do not exist.",
        harmonicDistortion: "There is no evidence of harmonic distortion.",
        misalignmentUnbalance:
          "There are no indications of mechanical problems like misalignment or unbalance.",
      },
      inputSummary: {
        power: 600,
        rpm: 1479,
        poles: 4,
        phases: 3,
        voltage: 6600,
        fullLoadCurrent: 64.5,
        torque: 3871,
        ctRatio: 100,
        ptRatio: 60,
        serviceFactory: 115,
        powerFactor: -1,
      },
      detailedCalculations: {
        runningSpeed: 24.942,
        polePassFrequency: 0.275,
        load: 25,
        // ... (add more detailed calculations as needed)
      },
      vibrationMeasurement: {
        de: {
          horizontal: 0.6,
          vertical: 1.2,
          axial: 2.1,
        },
        nde: {
          horizontal: 1.5,
          vertical: 1.0,
          axial: 1.6,
        },
      },
    };
    const createPDF = async () => {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Get the dimensions of the PDF document
      const pdfDimensions =
        pdfDoc.getPages().length === 0
          ? [612, 792]
          : pdfDoc.getPage(0).getSize();

      // Create a new page and get its width and height
      const page = pdfDoc.addPage(pdfDimensions);
      const { width, height } = page.getSize();
      console.log("height:",height)

      // Set the font and font size
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;

      // Write the report content
      let currentY = height - 50;
      const writeText = (text, size = fontSize) => {
        if (typeof currentY !== "number" || isNaN(currentY)) {
          console.error("Invalid currentY value:", currentY);
          return;
        }

        if (typeof size !== "number" || isNaN(size)) {
          console.error("Invalid size value:", size);
          return;
        }
        page.drawText(text, {
          x: 50,
          y: currentY,
          size,
          font,
        });
        currentY -= size + 4; // Add some spacing between lines
      };

      // Write the motor details
      writeText(`Motor ID: ${reportData.motorId}`, fontSize + 2);
      writeText(`Make: ${reportData.make}`);
      writeText(`Rating: ${reportData.rating} KW`);
      writeText(`Voltage: ${reportData.voltage} Volts`);
      writeText(`Current: ${reportData.current} Amps`);
      writeText(`Insulation Class: ${reportData.insulationClass}`);
      writeText(`Frequency: ${reportData.frequency} Hz`);
      writeText(`Speed: ${reportData.speed} RPM`);

      currentY -= 16; // Add extra spacing

      // Write the performance summary
      writeText("PERFORMANCE SUMMARY", fontSize + 4);
      writeText(reportData.performanceSummary.bottomLine);
      writeText(reportData.performanceSummary.powerFactor);
      writeText(reportData.performanceSummary.current);
      writeText(reportData.performanceSummary.voltage);
      writeText(reportData.performanceSummary.load);
      writeText(reportData.performanceSummary.phaseConnection);
      writeText(reportData.performanceSummary.stator);
      writeText(reportData.performanceSummary.rotorStatorAirGap);
      writeText(reportData.performanceSummary.harmonicDistortion);
      writeText(reportData.performanceSummary.misalignmentUnbalance);

      currentY -= 16; // Add extra spacing

      // Write the input summary
      writeText("INPUT SUMMARY", fontSize + 4);
      writeText(`Power: ${reportData.inputSummary.power} KW`);
      writeText(`RPM: ${reportData.inputSummary.rpm}`);
      writeText(`Poles: ${reportData.inputSummary.poles}`);
      writeText(`Phases: ${reportData.inputSummary.phases}`);
      writeText(`Voltage: ${reportData.inputSummary.voltage} Volts`);
      writeText(
        `Full Load Current: ${reportData.inputSummary.fullLoadCurrent} Amps`
      );
      writeText(`Torque: ${reportData.inputSummary.torque} N.m`);
      writeText(`CT Ratio: ${reportData.inputSummary.ctRatio}`);
      writeText(`PT Ratio: ${reportData.inputSummary.ptRatio}`);
      writeText(`Service Factor: ${reportData.inputSummary.serviceFactory}`);
      writeText(`Power Factor: ${reportData.inputSummary.powerFactor}`);

      currentY -= 16; // Add extra spacing

      // Write the detailed calculations
      writeText("DETAILED CALCULATIONS", fontSize + 4);
      writeText(
        `Running Speed: ${reportData.detailedCalculations.runningSpeed} Hz [${
          reportData.detailedCalculations.runningSpeed * 60
        } RPM]`
      );
      writeText(
        `Pole Pass Frequency: ${
          reportData.detailedCalculations.polePassFrequency
        } Hz [${reportData.detailedCalculations.polePassFrequency * 60} RPM]`
      );
      writeText(`Load: ${reportData.detailedCalculations.load}%`);

      currentY -= 16; // Add extra spacing

      // Write the vibration measurement
      writeText("VIBRATION MEASUREMENT", fontSize + 4);
      writeText("Motor ID\tVibration (mm/Sec.)");
      writeText("\t\tMotor (DE)\t\t\tMotor (NDE)");
      writeText("\tHorizontal\tVertical\tAxial\tHorizontal\tVertical\tAxial");
      writeText(
        `\t${reportData.vibrationMeasurement.de.horizontal}\t\t${reportData.vibrationMeasurement.de.vertical}\t\t${reportData.vibrationMeasurement.de.axial}\t\t${reportData.vibrationMeasurement.nde.horizontal}\t\t${reportData.vibrationMeasurement.nde.vertical}\t\t${reportData.vibrationMeasurement.nde.axial}`
      );

      // Serialize the PDF document to bytes
    //   const pdfBytes = await pdfDoc.save();
      // console.log("PDF file generated: output.pdf");
    //   return pdfBytes.toString("base64");
    };

    try {
      const pdfBytes = await createPDF();
      const base64String = Buffer.from(pdfBytes).toString("base64");
      resolve(base64String);
    } catch (error) {
      reject(error);
    }
  });
}
