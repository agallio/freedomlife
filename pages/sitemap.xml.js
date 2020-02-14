import React from 'react';

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?><urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>https://freedomlife.id/bible</loc><lastmod>2020-02-15</lastmod></url><url><loc>https://freedomlife.id/guide</loc><lastmod>2020-02-15</lastmod></url><url><loc>https://freedomlife.id/index</loc><lastmod>2020-02-15</lastmod></url><url><loc>https://freedomlife.id/sitemap.xml</loc><lastmod>2020-02-15</lastmod></url><url><loc>https://freedomlife.id/warta</loc><lastmod>2020-02-15</lastmod></url></urlset>`;

export default class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml);
    res.end();
  }
}
