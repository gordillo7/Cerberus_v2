from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from datetime import datetime
import os, sys, json

def sanitize(target):
    return target.replace("http://", "").replace("https://", "").rstrip("/")

def create_cover_page(target):
    styles = getSampleStyleSheet()
    elements = []

    # Add the logo if available
    logo_path = 'static/img/cerberus_report.png'
    if os.path.exists(logo_path):
        elements.append(Spacer(0, 44))
        elements.append(Image(logo_path, width=380, height=380))
        elements.append(Spacer(0, 30))

    # Add target title
    title = f"Report for {target}"
    elements.append(Paragraph(title, styles['Title']))
    elements.append(Spacer(1, 10))

    # Add scan date/time below title in smaller font
    small_style = ParagraphStyle('smallStyle', parent=styles['Normal'], fontSize=12, alignment=1)
    scan_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    elements.append(Paragraph(scan_datetime, small_style))
    elements.append(Spacer(1, 50))

    # Add a page break so that the rest starts on a new page
    elements.append(PageBreak())
    return elements


def create_nmap_table(filepath):
    data = [["Port", "State", "Service", "Version"]]
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
        for line in file:
            if "open" in line:
                parts = line.split()
                port = parts[0]
                state = parts[1]
                service = parts[2]
                version = " ".join(parts[3:])
                data.append([port, state, service, version])

    table = Table(data)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    return table


def create_text_paragraph(filepath):
    styles = getSampleStyleSheet()
    content = ""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
        for line in file:
            content += f"{line.strip()}<br/>"
    paragraph = Paragraph(content, styles['Normal'])
    return [paragraph, Spacer(1, 12)]


def draw_header_footer(canvas, doc):
    canvas.saveState()

    # Header: draw logo on left and right, and centered text
    logo_path = 'static/img/favicon.ico'
    header_y = doc.pagesize[1] - 50
    logo_width = 40
    logo_height = 40
    if os.path.exists(logo_path):
        # Left logo
        canvas.drawImage(logo_path, doc.leftMargin, header_y, width=logo_width, height=logo_height,
                         preserveAspectRatio=True, mask='auto')
        # Right logo
        canvas.drawImage(logo_path, doc.pagesize[0] - doc.rightMargin - logo_width, header_y, width=logo_width,
                         height=logo_height, preserveAspectRatio=True, mask='auto')

    canvas.setFont("Helvetica", 12)
    canvas.drawCentredString(doc.pagesize[0] / 2, header_y + 10, "Cerberus - Detailed Report")
    canvas.setLineWidth(0.1)
    canvas.line(doc.leftMargin, header_y - 5, doc.pagesize[0] - doc.rightMargin, header_y - 5)

    # Footer: draw a thin line and centered page number
    footer_y = 40
    canvas.setLineWidth(0.1)
    canvas.line(doc.leftMargin, footer_y, doc.pagesize[0] - doc.rightMargin, footer_y)
    canvas.setFont("Helvetica", 10)
    page_num = canvas.getPageNumber()
    canvas.drawCentredString(doc.pagesize[0] / 2, footer_y - 20, f"Page {page_num}")

    canvas.restoreState()


def generate_report(target, flag=None):
    report_dir = f"logs/{target}/report"
    if not os.path.exists(report_dir):
        print(f"[-] Error: The folder {report_dir} does not exist.")
        return

    if flag == "-p":
        found_project = None
        projects_dir = "projects"
        for filename in os.listdir(projects_dir):
            if filename.endswith(".json"):
                filepath = os.path.join(projects_dir, filename)
                with open(filepath, "r", encoding="utf-8") as f:
                    project = json.load(f)
                if sanitize(project.get("target", "")) == target:
                    found_project = project
                    break
        if not found_project:
            print(f"[-] Error: No projects found for {target}")
            return
        project_id = found_project["id"]
        base_report_dir = os.path.join("projects", project_id, "reports")
        os.makedirs(base_report_dir, exist_ok=True)

        import re
        pattern = re.compile(r"v(\d+)" + re.escape(target) + r"\.pdf$")
        existing_versions = []
        for fname in os.listdir(base_report_dir):
            match = pattern.match(fname)
            if match:
                existing_versions.append(int(match.group(1)))
        max_version = max(existing_versions) if existing_versions else 0
        version = max_version + 1
        output_path = os.path.join(base_report_dir, f"v{version}{target}.pdf")
    else:
        output_path = f"reports/{target}.pdf"
        if os.path.exists(output_path):
            os.remove(output_path)

    doc = SimpleDocTemplate(output_path, pagesize=letter)
    elements = []

    # Insert cover page (first page with scan date inside)
    elements.extend(create_cover_page(target))

    styles = getSampleStyleSheet()

    try:
        for filename in sorted(os.listdir(report_dir), key=lambda x: 0 if x == "nmap.txt" else 1):
            filepath = os.path.join(report_dir, filename)
            if os.path.isfile(filepath):
                match filename:
                    case "nmap.txt":
                        elements.append(Paragraph("Open services", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(create_nmap_table(filepath))
                        elements.append(Spacer(1, 24))
                    case "dns_recon.txt":
                        elements.append(Paragraph("DNS Recon", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("In this section, the information associated with the domain is reported.", styles['Normal']))
                        elements.append(Spacer(1, 10))
                        # Process the file: use the first line of each section as Heading3 and the following lines until "#" as normal text
                        with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
                            section = []
                            for line in file:
                                line = line.strip()
                                if line == "#":
                                    if section:
                                        elements.append(Paragraph(section[0], styles['Heading3']))
                                        elements.append(Spacer(1, 8))
                                        for l in section[1:]:
                                            elements.append(Paragraph(l, styles['Normal']))
                                        elements.append(Spacer(1, 12))
                                    section = []
                                else:
                                    section.append(line)
                            if section:
                                elements.append(Paragraph(section[0], styles['Heading3']))
                                elements.append(Spacer(1, 8))
                                for l in section[1:]:
                                    elements.append(Paragraph(l, styles['Normal']))
                                elements.append(Spacer(1, 24))
                    case "http_screenshot.png":
                        elements.append(Paragraph("Website screenshot", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Image(filepath, width=400, height=300))
                        elements.append(Spacer(1, 24))
                    case "http_subdomains.txt":
                        elements.append(Paragraph("Subdomains", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("In this section, the subdomains of the target are reported.", styles['Normal']))
                        elements.append(Spacer(1, 12))
                        numbered_content = ""
                        with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
                            for i, line in enumerate(file, 1):
                                numbered_content += f"{i}. {line.strip()}<br/>"
                        elements.append(Paragraph(numbered_content, styles['Normal']))
                        elements.append(Spacer(1, 24))
                    case "wordpress_usernames.txt":
                        elements.append(Paragraph("WordPress Usernames", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("This WordPress is vulnerable to user enumeration. These usernames have been enumerated.", styles['Normal']))
                        elements.append(Spacer(1, 12))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "wordpress_vulnerable_plugins.txt":
                        elements.append(Paragraph("WordPress Vulnerable Plugins", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("This WordPress is vulnerable to outdated plugins.", styles['Normal']))
                        elements.append(Spacer(1, 12))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "wordpress_listing.txt":
                        elements.append(Paragraph("WordPress Directory Listing", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "wordpress_credentials.txt":
                        elements.append(Paragraph("WordPress Credentials", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("Valid WordPress credentials have been found.", styles['Normal']))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "ftp_cves.txt":
                        elements.append(Paragraph("FTP Vulnerabilities", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("CVEs for the running FTP version have been found.", styles['Normal']))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "ftp_write_perm.txt":
                        elements.append(Paragraph("FTP Write Permissions", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "ftp_anonymous.txt":
                        elements.append(Paragraph("FTP Anonymous Login", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "ftp_credentials_found.txt":
                        elements.append(Paragraph("FTP Credentials", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("Valid FTP credentials have been found.", styles['Normal']))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "ftp_no_limit.txt":
                        elements.append(Paragraph("FTP no attempt limit", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "joomscan.txt":
                        import re
                        elements.append(Paragraph("Joomla Scan", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("In this section, the results of the Joomla scan are reported.",
                                                  styles['Normal']))
                        elements.append(Spacer(1, 12))

                        heading_pattern = re.compile(r'^\d+\.\s*(.+?)\s*$')
                        current_heading = None
                        current_content = []
                        with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
                            for line in file:
                                line = line.rstrip()
                                if not line:
                                    continue
                                match = heading_pattern.match(line)
                                if match:
                                    if current_heading is not None:
                                        elements.append(Paragraph(current_heading, styles['Heading3']))
                                        elements.append(Spacer(1, 8))
                                        for content_line in current_content:
                                            elements.append(Paragraph(content_line, styles['Normal']))
                                        elements.append(Spacer(1, 12))
                                    current_heading = match.group(1)
                                    current_content = []
                                else:
                                    current_content.append(line)
                        if current_heading is not None:
                            elements.append(Paragraph(current_heading, styles['Heading3']))
                            elements.append(Spacer(1, 8))
                            for content_line in current_content:
                                elements.append(Paragraph(content_line, styles['Normal']))
                            elements.append(Spacer(1, 12))
                        elements.append(Spacer(1, 24))
                    case "ssh_credentials_found.txt":
                        elements.append(Paragraph("SSH Credentials", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("Valid SSH credentials have been found.", styles['Normal']))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "ssh_cves.txt":
                        elements.append(Paragraph("SSH Vulnerabilities", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("CVEs for the running SSH version have been found.", styles['Normal']))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "osint_mail.txt":
                        elements.append(Paragraph("OSINT Mail", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("In this section, the email addresses found are reported.", styles['Normal']))
                        elements.append(Spacer(1, 12))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "nuclei_webscan.txt":
                        elements.append(Paragraph("Web Scan", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("In this section, the results of the web scan are reported.", styles['Normal']))
                        elements.append(Spacer(1, 12))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))
                    case "fuzzing.txt":
                        elements.append(Paragraph("Fuzzing", ParagraphStyle('Heading1Centered', parent=styles['Heading1'], alignment=1)))
                        elements.append(Spacer(1, 8))
                        elements.append(Paragraph("In this section, the results of the fuzzing scan are reported.", styles['Normal']))
                        elements.append(Spacer(1, 12))
                        elements.extend(create_text_paragraph(filepath))
                        elements.append(Spacer(1, 24))

    except Exception as e:
        print(f"[-] Error generating report: {e}")
        return

    try:
        # Build the document with no header/footer on the first page (cover)
        # and header/footer starting from the second page.
        doc.build(elements, onFirstPage=lambda canvas, doc: None, onLaterPages=draw_header_footer)
        print(f"[+] Report generated: {output_path}")
    except Exception as e:
        print(f"[-] Error saving report: {e}")


def run_generate_report(target, flag=None):
    generate_report(target, flag)


if __name__ == "__main__":
    target = sys.argv[1]
    if len(sys.argv) > 2 and sys.argv[2] == "-p":
        run_generate_report(target, "-p")
    else:
        run_generate_report(target)
