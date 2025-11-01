import { optimize } from 'svgo';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: true,
          removeUnknownsAndDefaults: true,
          removeUselessDefs: true,
          collapseGroups: true,
          convertShapeToPath: true,
          mergePaths: true,
          convertTransform: true,
          removeNonInheritableGroupAttrs: true,
          removeUselessStrokeAndFill: true,
          removeHiddenElems: true,
          minifyStyles: true,
          sortAttrs: true,
        },
      },
    },
    {
      name: 'removeViewBox',
      active: false, // Giữ viewBox để responsive
    },
    {
      name: 'removeDimensions',
      active: false, // Giữ width/height nếu có
    },
    {
      name: 'removeScripts',
    },
  ],
};

function getAllSvgFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllSvgFiles(filePath, fileList);
    } else if (extname(file) === '.svg') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function optimizeSvg(filePath) {
  try {
    const svgContent = readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(svgContent, 'utf8');
    
    const result = optimize(svgContent, {
      ...svgoConfig,
      path: filePath,
    });
    
    if (result.error) {
      console.error(`❌ Error optimizing ${filePath}:`, result.error);
      return null;
    }
    
    const optimizedSize = Buffer.byteLength(result.data, 'utf8');
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    if (optimizedSize < originalSize) {
      writeFileSync(filePath, result.data, 'utf8');
      return {
        file: filePath,
        original: originalSize,
        optimized: optimizedSize,
        savings,
      };
    }
    
    return null;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

// Main execution
const svgDir = join(process.cwd(), 'public', 'svgs');
const svgFiles = getAllSvgFiles(svgDir);

console.log(`\n🔍 Found ${svgFiles.length} SVG files to optimize...\n`);

let totalOriginal = 0;
let totalOptimized = 0;
const results = [];

svgFiles.forEach((filePath) => {
  const result = optimizeSvg(filePath);
  if (result) {
    results.push(result);
    totalOriginal += result.original;
    totalOptimized += result.optimized;
  }
});

console.log('\n📊 Optimization Results:\n');
results.forEach((r) => {
  const relativePath = r.file.replace(process.cwd(), '.');
  console.log(`✅ ${relativePath}`);
  console.log(`   ${(r.original / 1024).toFixed(2)} KB → ${(r.optimized / 1024).toFixed(2)} KB (${r.savings}% smaller)\n`);
});

if (results.length > 0) {
  const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(2);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Total: ${(totalOriginal / 1024).toFixed(2)} KB → ${(totalOptimized / 1024).toFixed(2)} KB`);
  console.log(`Saved: ${((totalOriginal - totalOptimized) / 1024).toFixed(2)} KB (${totalSavings}% reduction)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
} else {
  console.log('✨ All SVG files are already optimized!\n');
}

