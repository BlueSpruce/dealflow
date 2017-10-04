/*
input -> imput html string
output <- pdf buffer
*/
import pdfConverter from "jspdf";
const toDataUrl = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
};
export const generate = str => {
  var doc = new pdfConverter("p", "pt", "a4");
  console.log(doc.getFontList());
  toDataUrl("background.jpg", function(base64Img) {
    var imgData = base64Img;
    console.log("imgDATA " + imgData);
    console.log("Adding to doc.");
    //  doc.addImage(imgData, "JPEG", 0, 0, 612, 792);
    console.log("Image added.");
    let htmlStr = str;
    /*
    doc.fromHTML(htmlStr, 20, 20, {
      width: 500
    });
    */
    doc.fromHTML(
      htmlStr,
      20,
      20,
      {
        width: 500
      },
      function() {
        console.log("About to save");
        //doc.save("test.pdf");
        console.log(doc.output("datauristring"));
      }
    );
  });
};
