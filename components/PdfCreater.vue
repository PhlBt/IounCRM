<template>
  <v-dialog
    v-model="data.show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar ref="toolbar" dark color="primary">
        <v-toolbar-title>{{ this.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <div v-show="this.pdf === null">
        <v-progress-linear
          indeterminate
          color="success"
          class="mb-0"
        ></v-progress-linear>
        <v-container>
          <v-row class="d-flex justify-center mt-6 title">
            Создание документа...
          </v-row>
        </v-container>
      </div>
      <div ref="pdfviewer"></div>
      <div class="d-none">
        <BillTemplate :data="file" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import PDFObject from "pdfobject";
import { jsPDF } from "jspdf";
import BillTemplate from "@/components/BillTemplate";

export default {
  name: "PdfCreater",
  components: { BillTemplate },
  props: {
    data: Object,
  },
  data() {
    return {
      pdf: null,
      file: null,
    };
  },
  computed: {
    toolbar: function () {
      return this.$refs.toolbar.styles.height;
    },
    title: function () {
      return this.file !== null
        ? `Cчет №${this.file.bill.numb} от ${this.file.bill.date}`
        : "";
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    showFile(data) {
      this.file = data ? data : null;
      let self = this;

      this.$nextTick(function () {
        const bill = new jsPDF({
          orientation: "p",
          unit: "px",
          format: "a4",
          putOnlyUsedFonts: true,
        });
        bill.setDocumentProperties({
          title: this.title,
        });
        bill.addFont("/arial.ttf", "Arial", "normal");

        if (document.querySelector("#html") !== null) {
          bill.html(document.querySelector("#html"), {
            callback: function (bill) {
              self.pdf =
                self.file !== null
                  ? PDFObject.embed(
                      bill.output("dataurlstring"),
                      self.$refs.pdfviewer
                    )
                  : null;
              self.$refs.pdfviewer.style.height = `calc( 100vh - ${self.toolbar} )`;
            },
            x: 15,
            y: 20,
          });
        }
      });
    },
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.showFile(this.data.data);
      },
    },
  },
};
</script>