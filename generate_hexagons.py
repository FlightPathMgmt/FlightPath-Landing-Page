import math

def generate_grid():
    r = 45
    w = r * math.sqrt(3) # ~77.94
    h_step = w
    v_step = 1.5 * r # 67.5
    
    # Grid size for SVG viewBox="0 0 500 400"
    width, height = 500, 400
    
    # We want a cluster concentrated towards the right and top-right (x > 150)
    # Generate centers
    centers = []
    for row in range(-1, 7):
        for col in range(-1, 8):
            cy = 40 + row * v_step
            cx = 80 + col * h_step
            if row % 2 != 0:
                cx += h_step / 2
            
            # Filter centers to fit the visual aesthetic (angled crop, denser on the right)
            # We want them mostly in the range x from 120 to 520, y from -50 to 450
            if cx > 80 and cx < 550 and cy > -50 and cy < 450:
                # Denser on the right: probability of keeping depends on x coordinate
                # Let's manually select centers to look organic and match the design image
                # Let's check distance from top-right. We want a diagonal cut from top-left to bottom-right.
                if cx + cy > 250:
                    centers.append((cx, cy))
                    
    # Generate unique vertices and edges
    vertices = {} # coord tuple -> index
    vertex_list = []
    edges = set() # (idx1, idx2)
    
    def get_vertex_idx(x, y):
        # Round to avoid floating point duplication
        key = (round(x, 1), round(y, 1))
        if key not in vertices:
            vertices[key] = len(vertex_list)
            vertex_list.append(key)
        return vertices[key]
        
    for cx, cy in centers:
        # 6 vertices
        v = [
            (cx, cy - r),
            (cx + w/2, cy - r/2),
            (cx + w/2, cy + r/2),
            (cx, cy + r),
            (cx - w/2, cy + r/2),
            (cx - w/2, cy - r/2)
        ]
        
        idxs = [get_vertex_idx(x, y) for x, y in v]
        
        # Add edges
        for i in range(6):
            idx1 = idxs[i]
            idx2 = idxs[(i + 1) % 6]
            # Normalize edge to always have smaller index first
            edge = (min(idx1, idx2), max(idx1, idx2))
            edges.add(edge)
            
    # Filter edges and vertices to keep only those within our viewport with some bleed
    active_edges = []
    for idx1, idx2 in edges:
        p1 = vertex_list[idx1]
        p2 = vertex_list[idx2]
        # Keep if at least one point is inside or near the viewBox
        if (0 <= p1[0] <= 520 and -20 <= p1[1] <= 420) or (0 <= p2[0] <= 520 and -20 <= p2[1] <= 420):
            # Diagonal cut: discard lines in the far bottom-left
            if p1[0] + p1[1] > 260 and p2[0] + p2[1] > 260:
                active_edges.append((idx1, idx2))
                
    # Determine colors for edges
    # We want three colors: dark green (primary), light/medium green (secondary), grey (neutral)
    # Let's distribute them: 50% dark green, 30% light green, 20% grey
    # We can use a deterministic hash based on coordinates to make it consistent
    edge_styles = []
    for idx1, idx2 in active_edges:
        p1 = vertex_list[idx1]
        p2 = vertex_list[idx2]
        mid_x = (p1[0] + p2[0]) / 2
        mid_y = (p1[1] + p2[1]) / 2
        
        h = int(mid_x * 7 + mid_y * 13) % 10
        if h < 5:
            color = "#0f733c" # Deep green
            opacity = 0.8
        elif h < 8:
            color = "#73b680" # Light/Medium green
            opacity = 0.7
        else:
            color = "#b0bec5" # Grey
            opacity = 0.5
            
        edge_styles.append((p1, p2, color, opacity))
        
    # Determine active vertices (vertices that have at least one active edge)
    active_vertex_indices = set()
    for idx1, idx2 in active_edges:
        active_vertex_indices.add(idx1)
        active_vertex_indices.add(idx2)
        
    # Place nodes at vertices
    # Design reference has:
    # 1. Solid dark green dots
    # 2. Solid light green dots
    # 3. Solid grey dots
    # 4. White-filled dots with dark green stroke
    # 5. Some vertices have no dots
    nodes = []
    for idx in active_vertex_indices:
        x, y = vertex_list[idx]
        
        # Decide node type based on coordinate hash
        h = int(x * 17 + y * 23) % 12
        if h < 3:
            # Solid dark green
            nodes.append((x, y, "fill", "#0f733c", 4))
        elif h < 6:
            # White filled with dark green outline
            nodes.append((x, y, "outline", "#0f733c", 4))
        elif h == 6:
            # Solid light green
            nodes.append((x, y, "fill", "#73b680", 4))
        elif h == 7:
            # Solid grey
            nodes.append((x, y, "fill", "#b0bec5", 4))
            
    # Output SVG elements
    svg_lines = []
    svg_lines.append("<!-- Hexagon Mesh Background Pattern -->")
    svg_lines.append("<g class='hex-mesh' opacity='0.75'>")
    
    # Draw edges
    for p1, p2, color, opacity in edge_styles:
        svg_lines.append(f'  <line x1="{p1[0]:.1f}" y1="{p1[1]:.1f}" x2="{p2[0]:.1f}" y2="{p2[1]:.1f}" stroke="{color}" stroke-width="1.8" opacity="{opacity}" />')
        
    # Draw nodes
    for x, y, ntype, color, radius in nodes:
        if ntype == "fill":
            svg_lines.append(f'  <circle cx="{x:.1f}" cy="{y:.1f}" r="{radius}" fill="{color}" />')
        else:
            svg_lines.append(f'  <circle cx="{x:.1f}" cy="{y:.1f}" r="{radius}" fill="#ffffff" stroke="{color}" stroke-width="2" />')
            
    svg_lines.append("</g>")
    
    # Write to a file
    with open("hex_svg.txt", "w") as f:
        f.write("\n".join(svg_lines))
    print(f"Generated {len(edge_styles)} edges and {len(nodes)} nodes. Output written to hex_svg.txt")

if __name__ == '__main__':
    generate_grid()
