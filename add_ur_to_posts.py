import re
import sys

file_path = '/src/data/posts.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add ur: '' to title, excerpt, and content objects
# We look for ar: '...' or ar: `...` and add ur: '' after it
pattern = r"(ar:\s*(?:'[^']*'|`[^`]*`))"
replacement = r"\1,\n      ur: ''"

new_content = re.sub(pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
