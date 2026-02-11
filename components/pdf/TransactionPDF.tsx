// components/TransactionPDF.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Transaction } from '@/app/(private)/transaction/columns';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
    borderBottomStyle: 'solid',
  },
  tableCol: {
    width: '16.6%',
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
});

interface TransactionPDFProps {
  transactions: Transaction[];
}

const TransactionPDF: React.FC<TransactionPDFProps> = ({ transactions }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Laporan Transaksi</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, { backgroundColor: '#f2f2f2' }]}>
            <Text style={[styles.tableCol, styles.tableCell]}>ID</Text>
            <Text style={[styles.tableCol, styles.tableCell]}>
              Tanggal Transaksi
            </Text>
            <Text style={[styles.tableCol, styles.tableCell]}>Nama Barang</Text>
            <Text style={[styles.tableCol, styles.tableCell]}>Kuantitas</Text>
            <Text style={[styles.tableCol, styles.tableCell]}>Total Harga</Text>
            <Text style={[styles.tableCol, styles.tableCell]}>Oleh</Text>
          </View>
          {transactions.map((transaction) => (
            <View style={styles.tableRow} key={transaction.id}>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {transaction.id}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {new Date(transaction.tanggal_transaksi).toLocaleDateString()}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {transaction.stock.nama_barang}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {transaction.kuantitas}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {transaction.total_harga}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {transaction.user_id || '-'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default TransactionPDF;
