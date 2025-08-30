const fs = require('fs');

function checkJavaScript() {
    console.log('🔍 檢查 index.html 中的 JavaScript 語法...');
    
    try {
        const html = fs.readFileSync('../index.html', 'utf8');
        
        // 提取 <script> 標籤內容
        const scriptMatches = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
        
        if (scriptMatches) {
            scriptMatches.forEach((script, index) => {
                // 移除 <script> 標籤
                const jsCode = script.replace(/<\/?script[^>]*>/g, '').trim();
                
                if (jsCode.length > 0) {
                    console.log(`\n📝 檢查第 ${index + 1} 個 script 標籤 (${jsCode.length} 字符):`);
                    
                    // 檢查常見的語法問題
                    const issues = [];
                    
                    // 檢查括號匹配
                    const openBraces = (jsCode.match(/\{/g) || []).length;
                    const closeBraces = (jsCode.match(/\}/g) || []).length;
                    if (openBraces !== closeBraces) {
                        issues.push(`括號不匹配: { = ${openBraces}, } = ${closeBraces}`);
                    }
                    
                    // 檢查圓括號匹配
                    const openParens = (jsCode.match(/\(/g) || []).length;
                    const closeParens = (jsCode.match(/\)/g) || []).length;
                    if (openParens !== closeParens) {
                        issues.push(`圓括號不匹配: ( = ${openParens}, ) = ${closeParens}`);
                    }
                    
                    // 檢查方括號匹配
                    const openBrackets = (jsCode.match(/\[/g) || []).length;
                    const closeBrackets = (jsCode.match(/\]/g) || []).length;
                    if (openBrackets !== closeBrackets) {
                        issues.push(`方括號不匹配: [ = ${openBrackets}, ] = ${closeBrackets}`);
                    }
                    
                    // 檢查字符串引號
                    const singleQuotes = (jsCode.match(/'/g) || []).length;
                    const doubleQuotes = (jsCode.match(/"/g) || []).length;
                    if (singleQuotes % 2 !== 0) {
                        issues.push(`單引號不匹配: ${singleQuotes} 個`);
                    }
                    if (doubleQuotes % 2 !== 0) {
                        issues.push(`雙引號不匹配: ${doubleQuotes} 個`);
                    }
                    
                    // 檢查模板字符串
                    const templateQuotes = (jsCode.match(/`/g) || []).length;
                    if (templateQuotes % 2 !== 0) {
                        issues.push(`模板字符串引號不匹配: ${templateQuotes} 個`);
                    }
                    
                    // 檢查是否有未完成的語句
                    const lines = jsCode.split('\n');
                    const lastLine = lines[lines.length - 1].trim();
                    if (lastLine && !lastLine.endsWith(';') && !lastLine.endsWith('}') && !lastLine.endsWith(')')) {
                        issues.push(`最後一行可能未完成: "${lastLine}"`);
                    }
                    
                    if (issues.length > 0) {
                        console.log('❌ 發現問題:');
                        issues.forEach(issue => console.log(`   - ${issue}`));
                    } else {
                        console.log('✅ 基本語法檢查通過');
                    }
                    
                    // 顯示代碼的開頭和結尾
                    console.log(`📄 代碼開頭 (前 100 字符): ${jsCode.substring(0, 100)}...`);
                    console.log(`📄 代碼結尾 (後 100 字符): ...${jsCode.substring(jsCode.length - 100)}`);
                }
            });
        } else {
            console.log('❌ 沒有找到 <script> 標籤');
        }
        
        // 檢查特定的 class 定義
        if (html.includes('class CreativeArtGenerator')) {
            console.log('✅ 找到 CreativeArtGenerator 類別定義');
        } else {
            console.log('❌ 沒有找到 CreativeArtGenerator 類別定義');
        }
        
        // 檢查 DOMContentLoaded 監聽器
        if (html.includes('DOMContentLoaded')) {
            console.log('✅ 找到 DOMContentLoaded 事件監聽器');
        } else {
            console.log('❌ 沒有找到 DOMContentLoaded 事件監聽器');
        }
        
    } catch (error) {
        console.error('❌ 讀取檔案失敗:', error);
    }
}

checkJavaScript();