'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StockPDF from './pdf/StockPDF';
import { Stock } from '@/app/((private))/stock/columns';
import { Button } from '@/components/ui/button';

interface StockPDFDownloadProps {
  stockData: Stock[];
}

const StockPDFDownload: React.FC<StockPDFDownloadProps> = ({ stockData }) => {
  return (
    <Button asChild variant="default">
      <PDFDownloadLink
        document={<StockPDF stockData={stockData} />}
        fileName="stock_report.pdf"
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </Button>
  );
};

export default StockPDFDownload;
