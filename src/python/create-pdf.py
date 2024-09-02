import os
import sys

from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.utils import ImageReader
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Image

desktop_path = os.path.expanduser("~/Desktop/")
mem_path = "docs/"

file_name = sys.argv[1]
file_content = sys.argv[2]

# Define the path to save the PDF
pdf_path = mem_path + file_name + ".pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=72)

styles = getSampleStyleSheet()

# Create a story that will build our PDF
story = []

# Add title
title = Paragraph(file_name, styles['Title'])
story.append(title)

# get the current time
now = datetime.now()
current_time = now.strftime("%Y-%m-%d %H:%M:%S")
# Add footer with timestamp
footer = Paragraph("Generated on: " + current_time, styles['Normal'])
story.append(footer)

# Add content
content = Paragraph(file_content, styles['Normal'])
story.append(content)


# Generate an array of data for the table
table_headers = ['FIRST NAME', 'LAST NAME', 'EMAIL', 'PHONE']
# Get the data from the database
table_data = [table_headers,
              ['Jessica', 'Rosier', 'jessica1@gmail.com', '714-341-951'],
              ['John', 'Doe', 'johndoe@yahoo.com', '210-342-1234'],
              ['Jane', 'Smith', 'jsmith@gmail.com', '757-342-1234']]

# Create a table object
table = Table(table_data)

# Add style to the table
table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 14),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
    ('BACKGROUND', (0, 1), (-1, -1), colors.aliceblue),
    ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
    ('FONTSIZE', (0, 1), (-1, -1), 12),
    ('TOPPADDING', (0, 1), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
    ('GRID', (0, 0), (-1, -1), 1, colors.black)
]))

# Add the table to the story
story.append(table)

# Add an image from a file
image_path = os.path.expanduser("~/Desktop/image.jpg")
im = ImageReader(image_path)
img_width, img_height = im.getSize()
aspect_ratio = img_height / float(img_width)

# Set a maximum width for the image (e.g., 400 points)
max_width = 400
image_width = min(img_width, max_width)
image_height = image_width * aspect_ratio

# Create an Image object
image = Image(image_path, width=image_width, height=image_height)
story.append(image)

# Build the document
doc.build(story)


# Send the file path to the frontend
print(pdf_path)

