import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { Stock } from '@/app/(private)/stock/columns';

// Register a font to be used in the PDF
// Font.register({
//   family: 'Roboto',
//   src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/1.0.0/fonts/Roboto/roboto-light-webfont.ttf',
// });

const styles = StyleSheet.create({
  page: {
    // fontFamily: 'Roboto',
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#EEEEEE',
    padding: 5,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
  tableCellHeader: {
    margin: 'auto',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 'auto',
    fontSize: 10,
  },
});

interface StockPDFProps {
  stockData: Stock[];
}

const StockPDF: React.FC<StockPDFProps> = ({ stockData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Laporan Stok</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>ID</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Nama Barang</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Jumlah Barang</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Harga Barang</Text>
          </View>
        </View>
        {stockData.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.id}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.nama_barang}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.jumlah_barang}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.harga_barang}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default StockPDF;

