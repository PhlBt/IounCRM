<template>
  <div id="html" v-if="data !== null">
    <style type="text/css">
      #html {
        font-size: 9px;
        width: 416px;
        font-family: Arial;
      }
      .f10 {
        font-size: 10px;
      }
      .f8 {
        font-size: 8px;
      }
      p {
        margin-left: 4px;
        margin-bottom: 5px;
      }
      table {
        width: 100%;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        border-collapse: collapse;
      }
      tr {
        break-after: always;
      }
      td {
        border-top: 1px solid black;
        border-left: 1px solid black;
        vertical-align: baseline;
        padding: 5px;
      }
      td p {
        margin: 0;
      }
      h1 {
        font-size: 14px;
        text-align: center;
        margin: 20px 0 15px;
      }
      .text-center {
        text-align: center;
      }
      .text-end {
        text-align: end;
      }
      .ml-a {
        margin-left: auto;
      }
      .pb-5 {
        padding-bottom: 5px;
      }
      .ba-transparent,
      .ba-transparent td {
        border-color: transparent;
      }
      .bt-transparent {
        border-top-color: transparent;
      }
      .bb-black {
        border-bottom: 1px solid black!important;
      }
      .firstUpper:first-letter {
        text-transform: uppercase;
      }
      .w05 {
        width: 5%;
      }
      .w1 {
        width: 10%;
      }
      .w2 {
        width: 20%;
      }
      .w3 {
        width: 30%;
      }
      .w4 {
        width: 40%;
      }
      .w5 {
        width: 50%;
      }
      .w6 {
        width: 60%;
      }
    </style>
    <p>{{ data.owner.legalName }}</p>
    <p class="f10">{{ data.owner.address }}</p>
    <br />
    <p class="f8">Образец заполнения платежного поручения</p>
    <table>
      <tbody>
        <tr>
          <td class="w6" colspan="4" rowspan="2">
            <p>{{ data.owner.bank }}</p>
          </td>
          <td class="w1" colspan="1" rowspan="1">
            <p>БИК</p>
          </td>
          <td class="w3" colspan="1" rowspan="1">
            <p>{{ data.owner.bik }}</p>
          </td>
        </tr>
        <tr>
          <td colspan="1" rowspan="2">
            <p>Сч. №</p>
          </td>
          <td colspan="1" rowspan="2">
            <p>{{ data.owner.correspondentAccount }}</p>
          </td>
        </tr>
        <tr>
          <td class="bt-transparent" colspan="4" rowspan="1">
            <p class="f8">Банк получателя</p>
          </td>
        </tr>
        <tr>
          <td class="w1" colspan="1" rowspan="1">
            <p>ИНН</p>
          </td>
          <td class="w2" colspan="1" rowspan="1">
            <p>{{ data.owner.inn }}</p>
          </td>
          <td class="w1" colspan="1" rowspan="1">
            <p>КПП</p>
          </td>
          <td class="w2" colspan="1" rowspan="1"></td>
          <td colspan="1" rowspan="3">
            <p>Сч. №</p>
          </td>
          <td colspan="1" rowspan="3">
            <p>{{ data.owner.checkingAccount }}</p>
          </td>
        </tr>
        <tr>
          <td colspan="4" rowspan="1">
            <p>{{ data.owner.legalName }}</p>
          </td>
        </tr>
        <tr>
          <td class="bt-transparent" colspan="4" rowspan="1">
            <p class="f8">Получатель</p>
          </td>
        </tr>
      </tbody>
    </table>
    <h1>Счет на оплату №{{ data.bill.numb }} от {{ this.getDate }}</h1>
    <p>Поставщик: {{ data.owner.legalName }}</p>
    <p>Покупатель: {{ data.bill.client.legalName }}</p>
    <br />
    <table>
      <tbody>
        <tr class="text-center">
          <td class="w05">
            <p>№</p>
          </td>
          <td class="w5">
            <p>Услуги</p>
          </td>
          <td class="w1">
            <p>Кол-во</p>
          </td>
          <td class="w1">
            <p>Ед.</p>
          </td>
          <td class="w1">
            <p>Цена</p>
          </td>
          <td class="w1">
            <p>Сумма</p>
          </td>
        </tr>
        <tr v-for="(item, i) in data.bill.task" :key="i">
          <td class="text-center">
            <p>{{ 1 + i }}</p>
          </td>
          <td>
            <p>{{ item.desc }}</p>
          </td>
          <td class="text-end">
            <p>{{ item.count }}</p>
          </td>
          <td class="text-center">
            <p>{{ item.unit }}</p>
          </td>
          <td class="text-end">
            <p>{{ parseFloat(item.price).toFixed(2) }}</p>
          </td>
          <td class="text-end">
            <p>{{ parseFloat(item.sum).toFixed(2) }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <table class="ba-transparent w4 ml-a">
      <tbody>
        <tr>
          <td>Итого к оплате:</td>
          <td>{{ parseFloat(data.bill.sum).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>В том числе НДС:</td>
          <td>Без НДС</td>
        </tr>
      </tbody>
    </table>
    <br />
    <p class="bb-black pb-5">Всего к оплате: {{ this.getSumString }}.</p>
    <br /><br />
    <table class="ba-transparent" style="border-spacing: 1;">
      <tbody>
        <tr>
          <td><p>Поставщик</p></td>
          <td class="bb-black text-center"><p>Индивидуальный предприниматель</p></td>
          <td class="bb-black"><p>&nbsp;</p></td>
          <td class="bb-black"><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td></td>
          <td><p class="f8 text-center">должность</p></td>
          <td><p class="f8 text-center">подпись</p></td>
          <td><p class="f8 text-center">расшифровка подписи</p></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { rubles } from "rubles";
export default {
  name: "BillTemplate",
  props: {
    data: Object,
  },
  computed: {
    getDate() {
      return new Date(
        this.data.bill.date.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")
      )
        .toLocaleString("ru", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .slice(0, -3);
    },
    getSumString() {
      let result = rubles(this.data.bill.sum);
      return result.charAt(0).toUpperCase() + result.substr(1);
    },
  },
};
</script>