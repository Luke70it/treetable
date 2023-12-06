# Treetable

Treetable is a versatile implementation featuring branch status persistence for interactive table structures. This library facilitates the creation of hierarchical tables with ease.

## Usage

1. **Prepare Your Content Table:**
   - Create your content table using your preferred scripting language.
   - Utilize IDs, data-ids, and data-pids (parent element IDs) to define the hierarchical structure.
   - Ensure each table has a unique ID to manage multiple treetables on your website.
   - Assign the class "treetable" to your table.

2. **Integration:**
   - Include the script in your HTML file (as demonstrated in the example index.html).
   - Instantiate the treetable class after the </body> tag.

3. **Automatic Handle Creation:**
   - The script automatically generates clickable handles for rows with child elements.

4. **Persistence Across Page Reloads:**
   - The open/close status of branches is stored in the session storage.
   - This ensures that the branch status is maintained even after a page reload.

## Example (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Include any necessary styles or scripts -->
</head>
<body>

    <!-- Your Content Table -->
    <table id="uniqueTableId" class="treetable">
        <!-- Populate your table with content and hierarchical structure -->
    </table>

    <!-- Include the Treetable Script -->
    <script src="path/to/treetable.js"></script>

    <!-- Instantiate Treetable Class -->
    <script>
        const myTreetable = new Treetable('uniqueTableId');
    </script>

</body>
</html>
```

Enhance your web application's user experience with Treetable by effortlessly creating and managing hierarchical tables.
