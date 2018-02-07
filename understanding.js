/******************************************************************************
* Take an array of JSON objects (with identical keys) and turn it into various
* display formats
******************************************************************************/

function Table (data) {
   this.names = data[0];
   this.data = data[1];
}

Table.prototype = {
   constructor : Table,

   toHTML : function () {
      var html = `<table>${this._headerHTML()}<tbody>`;
      this.data.forEach((row) => {
         html += "<tr>";
         this.names.forEach((name, index) => {
            html += `<td>${row[index]}</td>`;
         });
         html += "</tr>";
      });
      return html + `</tbody></table>`;
   },

   _headerHTML: function () {
      var html = "<thead><tr>";
      this.names.forEach((name) => {
         html += `<th>${name}</th>`;
      });
      return html + "</tr></thead>";
   },

   toJSON : function () {
      return JSON.stringify({
         headers: this.names, data: this.data
      }, null, 2);
   },

   toORG: function () {
      var org = this._headerORG();
      this.data.forEach((row) => {
         org += "|";
         this.names.forEach((name, index) => {
            org += " ".repeat(name.length/2)
                + row[index]
                + " ".repeat(name.length/2)
                + ((name.length % 2 == 0) ? " " : "")
                + "|";
         });
         org += "\n";
      });
      return org;
   },

   _headerORG: function () {
      var html = "|";
      var bar  = "|";
      var last_one = this.names.length -1;
      this.names.forEach((name, idx) => {
         html += ` ${name} |`;
         bar  += "-".repeat(name.length+2)
              + ((idx === last_one) ? "|" : "+");
      });
      return html + "\n" + bar + "\n";
   },
}